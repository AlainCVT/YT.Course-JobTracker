"use server";

import { revalidatePath } from "next/cache";

import { getSession } from "@/lib/auth/auth";
import connectDB from "@/lib/db";
import {
  Board,
  Column,
  type ColumnType,
  JobApplication,
  type MongooseDeleteResult,
  type MongoSchemaBase,
  type MongoTimestampProps,
  type PopulatedColumnType,
} from "@/lib/models";

type CreateColumnPayload = Omit<
  PopulatedColumnType,
  keyof MongoSchemaBase | "order" | "userId" | "jobApplications" | keyof MongoTimestampProps
>;

type UpdateColumnPayload = Partial<
  Omit<
    PopulatedColumnType,
    keyof MongoSchemaBase | "userId" | "boardId" | "jobApplications" | keyof MongoTimestampProps
  >
>;

export async function createColumn(payload: CreateColumnPayload): Promise<PopulatedColumnType> {
  const session = await getSession();

  if (!session?.user) {
    throw new Error("Unauthorized");
  }

  const { name, icon, color, boardId } = payload;

  if (!boardId) {
    const error = new Error("Missing data");
    error.cause = ["boardId"];
    throw error;
  }

  if (!name || !icon || !color) {
    const error = new Error("Missing required fields");
    error.cause = ["name", "icon", "color"];
    throw error;
  }

  await connectDB();

  // Verify board ownership
  const board = await Board.findOne({
    _id: boardId,
    userId: session.user.id,
  });
  if (!board) throw new Error("Board not found");

  // Get current max order
  const columnWithMaxOrder = await Column.findOne({ boardId })
    .sort({ order: -1 })
    .select({ order: 1, _id: 0 })
    .lean<Pick<ColumnType, "order">>();

  // Create column
  const createdColumn = await Column.create({
    name,
    icon,
    color,
    order: columnWithMaxOrder ? columnWithMaxOrder.order + 1 : 0,
    userId: session.user.id,
    boardId,
    jobApplications: [],
  });

  // Add column to board
  await Board.findByIdAndUpdate(boardId, {
    $push: { columns: createdColumn._id },
  });

  revalidatePath("/dashboard");

  return JSON.parse(JSON.stringify(createdColumn));
}

export async function updateColumn(
  id: string,
  payload: UpdateColumnPayload,
): Promise<PopulatedColumnType> {
  const session = await getSession();

  if (!session?.user) {
    throw new Error("Unauthorized");
  }

  // Verify if columns exists and belongs to user
  const currentColumn = await Column.findById(id);

  if (!currentColumn) {
    throw new Error("Column not found");
  }

  if (currentColumn.userId !== session.user.id) {
    throw new Error("Unauthorized");
  }

  const currentBoardId = currentColumn.boardId.toString();
  const currentOrder = currentColumn.order || 0;

  if (payload.order !== undefined && payload.order !== null) {
    if (payload.order < currentOrder) {
      // Shift up columns' orders in the current board
      await Column.updateMany(
        {
          _id: { $ne: id },
          boardId: currentBoardId,
          order: { $gte: payload.order, $lt: currentOrder },
        },
        { $inc: { order: 1 } },
      );
    } else if (payload.order > currentOrder) {
      // Shift down columns' orders in the current board
      await Column.updateMany(
        {
          _id: { $ne: id },
          boardId: currentBoardId,
          order: { $gt: currentOrder, $lte: payload.order },
        },
        { $inc: { order: -1 } },
      );
    }
  }

  const updatedColumn = await Column.findByIdAndUpdate(id, payload, { returnDocument: "after" });

  revalidatePath("/dashboard");

  return JSON.parse(JSON.stringify(updatedColumn));
}

export async function deleteColumn(id: string): Promise<MongooseDeleteResult> {
  const session = await getSession();

  if (!session?.user) {
    throw new Error("Unauthorized");
  }

  // Verify if column exists and belongs to user
  const currentColumn = await Column.findById(id);

  if (!currentColumn) {
    throw new Error("Column not found");
  }

  if (currentColumn.userId !== session.user.id) {
    throw new Error("Unauthorized");
  }

  // Remove all job applications in the current column
  if (currentColumn.jobApplications.length) {
    await JobApplication.deleteMany({
      _id: { $in: currentColumn.jobApplications.map((jobApplication) => jobApplication._id) },
    });
  }

  // Remove column from current board
  await Board.findByIdAndUpdate(currentColumn.boardId, {
    $pull: { columns: id },
  });

  // Shift up columns' orders in the current board
  await Column.updateMany(
    {
      boardId: currentColumn.boardId,
      order: { $gt: currentColumn.order },
    },
    { $inc: { order: -1 } },
  );

  // Delete column
  const result = await Column.deleteOne({ _id: id });

  revalidatePath("/dashboard");

  return result;
}
