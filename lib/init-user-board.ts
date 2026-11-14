import connectDB from "./db";
import { Board, Column, type ColumnType, type MongoTimestampProps } from "./models";

const DEFAULT_COLUMNS: Omit<
  ColumnType,
  "jobApplications" | "userId" | "boardId" | keyof MongoTimestampProps
>[] = [
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
    const existingBoard = await Board.findOne({ userId });

    if (existingBoard) {
      const existingColumns = await Column.find({ boardId: existingBoard._id }).sort({ order: 1 });
      return { board: existingBoard, columns: existingColumns };
    }

    // Create the board
    const board = await Board.create({
      name: "Job Hunt",
      description: "Track your job applications",
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
          jobApplications: [],
          userId,
          boardId: board._id,
        }),
      ),
    );

    // Update the board with the new column IDs
    board.columns = columns.map((column) => column._id);
    await board.save();

    return { board, columns };
  } catch (error) {
    throw error;
  }
}
