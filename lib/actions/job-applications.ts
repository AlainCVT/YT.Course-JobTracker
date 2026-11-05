"use server";

import { revalidatePath } from "next/cache";

import { getSession } from "@/lib/auth/auth";
import connectDB from "@/lib/db";
import { Board, Column, JobApplication, type JobApplicationType } from "@/lib/models";

type JobApplicationPayload = Omit<
  JobApplicationType,
  "order" | "userId" | "createdAt" | "updatedAt"
>;

export async function createJobApplication(
  data: JobApplicationPayload,
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
    columnId,
    boardId,
  } = data;

  if (!columnId || !boardId) {
    const error = new Error("Missing data");
    error.cause = ["columnId", "boardId"];
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

  const maxOrder = await JobApplication.findOne({ columnId })
    .sort({ order: -1 })
    .select("order")
    .lean<Pick<JobApplicationType, "order">>();

  const jobApplication = await JobApplication.create({
    company,
    position,
    location,
    salary,
    url,
    tags,
    description,
    notes,
    order: maxOrder ? maxOrder.order + 1 : 0,
    columnId,
    boardId,
    userId: session.user.id,
  });

  await Column.findByIdAndUpdate(columnId, {
    $push: { jobApplications: jobApplication._id },
  });

  revalidatePath("/dashboard");

  return JSON.parse(JSON.stringify(jobApplication));
}
