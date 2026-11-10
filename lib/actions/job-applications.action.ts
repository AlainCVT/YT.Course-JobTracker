"use server";

import type { DeleteResult as MongooseDeleteResult } from "mongoose";
import { revalidatePath } from "next/cache";

import { getSession } from "@/lib/auth/auth";
import connectDB from "@/lib/db";
import {
  Board,
  Column,
  JobApplication,
  type JobApplicationType,
  type MongoSchemaBase,
  type MongoTimestampProps,
  type PopulatedJobApplicationType,
} from "@/lib/models";

type CreateJobApplicationPayload = Omit<
  PopulatedJobApplicationType,
  keyof MongoSchemaBase | "order" | "userId" | keyof MongoTimestampProps
>;

type UpdateJobApplicationPayload = Partial<
  Omit<
    PopulatedJobApplicationType,
    keyof MongoSchemaBase | "userId" | "boardId" | keyof MongoTimestampProps
  >
>;

export async function createJobApplication(
  payload: CreateJobApplicationPayload,
): Promise<PopulatedJobApplicationType> {
  const session = await getSession();

  if (!session?.user) {
    throw new Error("Unauthorized");
  }

  const {
    company,
    position,
    location,
    salary,
    url,
    tags = [],
    description,
    notes,
    boardId,
    columnId,
  } = payload;

  if (!boardId || !columnId) {
    const error = new Error("Missing data");
    error.cause = ["boardId", "columnId"];
    throw error;
  }

  if (!company || !position) {
    const error = new Error("Missing required fields");
    error.cause = ["company", "position"];
    throw error;
  }

  await connectDB();

  // Verify board ownership
  const board = await Board.findOne({
    _id: boardId,
    userId: session.user.id,
  });
  if (!board) throw new Error("Board not found");

  // Verify column belongs to board
  const column = await Column.findOne({
    _id: columnId,
    boardId,
  });
  if (!column) throw new Error("Column not found");

  // Get current max order
  const jobApplicationWithMaxOrder = await JobApplication.findOne({ columnId })
    .sort({ order: -1 })
    .select({ order: 1, _id: 0 })
    .lean<Pick<JobApplicationType, "order">>();

  // Create job application
  const createdJobApplication = await JobApplication.create({
    company,
    position,
    location,
    salary,
    url,
    tags,
    description,
    notes,
    order: jobApplicationWithMaxOrder ? jobApplicationWithMaxOrder.order + 1 : 0,
    userId: session.user.id,
    boardId,
    columnId,
  });

  // Add job application to column
  await Column.findByIdAndUpdate(columnId, {
    $push: { jobApplications: createdJobApplication._id },
  });

  revalidatePath("/dashboard");

  return JSON.parse(JSON.stringify(createdJobApplication));
}

export async function updateJobApplication(
  id: string,
  payload: UpdateJobApplicationPayload,
): Promise<PopulatedJobApplicationType> {
  const session = await getSession();

  if (!session?.user) {
    throw new Error("Unauthorized");
  }

  // Verify if job applications exists and belongs to user
  const currentJobApplication = await JobApplication.findById(id);

  if (!currentJobApplication) {
    throw new Error("Job application not found");
  }

  if (currentJobApplication.userId !== session.user.id) {
    throw new Error("Unauthorized");
  }

  const { columnId, ...restPayload } = payload;
  const currentColumnId = currentJobApplication.columnId.toString();
  const currentOrder = currentJobApplication.order || 0;
  const isMovingToDifferentColumn = !!columnId && columnId?.toString() !== currentColumnId;

  // Handle to job applications changes column
  if (isMovingToDifferentColumn) {
    // Remove job application from current column
    await Column.findByIdAndUpdate(currentColumnId, {
      $pull: { jobApplications: id },
    });

    // Shift job applications' orders in the current column
    await JobApplication.updateMany(
      {
        _id: { $ne: id },
        columnId: currentColumnId,
        order: { $gt: currentOrder },
      },
      { $inc: { order: -1 } },
    );

    if (payload.order !== undefined && payload.order !== null) {
      // Shift job applications' orders in the new column
      await JobApplication.updateMany(
        {
          _id: { $ne: id },
          columnId,
          order: { $gte: payload.order },
        },
        { $inc: { order: 1 } },
      );
    } else {
      // Set order in payload depending on job applications count in new column
      const jobApplicationWithMaxOrder = await JobApplication.findOne({
        _id: { $ne: id },
        columnId,
      })
        .sort({ order: -1 })
        .select({ order: 1, _id: 0 })
        .lean<Pick<JobApplicationType, "order">>();

      restPayload.order = jobApplicationWithMaxOrder ? jobApplicationWithMaxOrder.order + 1 : 0;
    }

    // Add job application to new column
    await Column.findByIdAndUpdate(columnId, {
      $push: { jobApplications: id },
    });
  } else if (payload.order !== undefined && payload.order !== null) {
    if (payload.order < currentOrder) {
      // Shift up job applications' orders in the current column
      await JobApplication.updateMany(
        {
          _id: { $ne: id },
          columnId: currentColumnId,
          order: { $gte: payload.order, $lt: currentOrder },
        },
        { $inc: { order: 1 } },
      );
    } else if (payload.order > currentOrder) {
      // Shift down job applications' orders in the current column
      await JobApplication.updateMany(
        {
          _id: { $ne: id },
          columnId: currentColumnId,
          order: { $gt: currentOrder, $lte: payload.order },
        },
        { $inc: { order: -1 } },
      );
    }
  }

  const updatedJobApplication = await JobApplication.findByIdAndUpdate(
    id,
    {
      ...restPayload,
      ...(isMovingToDifferentColumn && { columnId }),
    },
    { returnDocument: "after" },
  );

  revalidatePath("/dashboard");

  return JSON.parse(JSON.stringify(updatedJobApplication));
}

export async function deleteJobApplication(id: string): Promise<MongooseDeleteResult> {
  const session = await getSession();

  if (!session?.user) {
    throw new Error("Unauthorized");
  }

  // Verify if job applications exists and belongs to user
  const currentJobApplication = await JobApplication.findById(id);

  if (!currentJobApplication) {
    throw new Error("Job application not found");
  }

  if (currentJobApplication.userId !== session.user.id) {
    throw new Error("Unauthorized");
  }

  // Remove job application from current column
  await Column.findByIdAndUpdate(currentJobApplication.columnId, {
    $pull: { jobApplications: id },
  });

  // Shift up job applications' orders in the current column
  await JobApplication.updateMany(
    {
      columnId: currentJobApplication.columnId,
      order: { $gt: currentJobApplication.order },
    },
    { $inc: { order: -1 } },
  );

  // Delete job application
  const result = await JobApplication.deleteOne({ _id: id });

  revalidatePath("/dashboard");

  return result;
}
