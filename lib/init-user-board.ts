import connectDB from "./db";
import { Board, Column, type ColumnType } from "./models";

const DEFAULT_COLUMNS: Pick<ColumnType, "name" | "order" | "icon" | "color">[] = [
  { name: "Wish List", order: 0, icon: "Calendar", color: "cyan" },
  { name: "Applied", order: 1, icon: "CircleCheck", color: "purple" },
  { name: "Interviewing", order: 2, icon: "Mic", color: "green" },
  { name: "Offer", order: 3, icon: "Award", color: "yellow" },
  { name: "Rejected", order: 4, icon: "CircleX", color: "red" },
];

export async function initializeUserBoard(userId: string) {
  try {
    await connectDB();

    // Check if board already exists
    const existingBoard = await Board.findOne({ userId, name: "Job Hunt" });

    if (existingBoard) {
      return existingBoard;
    }

    // Create the board
    const board = await Board.create({
      name: "Job Hunt",
      userId,
      columns: [],
    });

    // Create default columns
    const columns = await Promise.all(
      DEFAULT_COLUMNS.map((column) =>
        Column.create({
          name: column.name,
          order: column.order,
          icon: column.icon,
          color: column.color,
          boardId: board._id,
          jobApplications: [],
        }),
      ),
    );

    // Update the board with the new column IDs
    board.columns = columns.map((column) => column._id);
    await board.save();

    return board;
  } catch (error) {
    throw error;
  }
}
