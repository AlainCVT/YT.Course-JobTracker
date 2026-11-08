"use server";

import { revalidatePath } from "next/cache";

import { getSession } from "@/lib/auth/auth";
import connectDB from "@/lib/db";
import {
  Board,
  Column,
  JobApplication,
  type JobApplicationType,
  type MongoTimestampProps,
} from "@/lib/models";

type CreateJobApplicationPayload = Omit<
  JobApplicationType,
  "order" | "userId" | keyof MongoTimestampProps
>;

export async function createJobApplication(
  payload: CreateJobApplicationPayload,
): Promise<JobApplicationType> {
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
  const maxOrder = await JobApplication.findOne({ columnId })
    .sort({ order: -1 })
    .select("order")
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
    order: maxOrder ? maxOrder.order + 1 : 0,
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
