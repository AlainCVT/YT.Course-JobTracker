"use server";

import { revalidatePath } from "next/cache";

import { getSession } from "@/lib/auth/auth";
import {
  Board,
  type MongoSchemaBase,
  type PopulatedBoardType,
  type PopulatedJobApplicationType,
} from "@/lib/models";

type UpdateJobApplicationPayload = Partial<
  Omit<PopulatedBoardType, keyof MongoSchemaBase | "columns" | "userId">
>;

export async function updateBoard(
  id: string,
  payload: UpdateJobApplicationPayload,
): Promise<PopulatedJobApplicationType> {
  const session = await getSession();

  if (!session?.user) {
    throw new Error("Unauthorized");
  }

  // Verify if board exists and belongs to user
  const currentBoard = await Board.findById(id);

  if (!currentBoard) {
    throw new Error("Board not found");
  }

  if (currentBoard.userId !== session.user.id) {
    throw new Error("Unauthorized");
  }

  const updatedBoard = await Board.findByIdAndUpdate(id, payload, { returnDocument: "after" });

  revalidatePath("/dashboard");

  return JSON.parse(JSON.stringify(updatedBoard));
}
