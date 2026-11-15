"use server";

import { revalidatePath } from "next/cache";

import { getSession } from "@/lib/auth/auth";
import connectDB from "@/lib/db";
import {
  Board,
  Column,
  type ColumnType,
  type MongoSchemaBase,
  type MongoTimestampProps,
  type PopulatedColumnType,
} from "@/lib/models";

type CreateColumnPayload = Omit<
  PopulatedColumnType,
  keyof MongoSchemaBase | "order" | "userId" | "jobApplications" | keyof MongoTimestampProps
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
