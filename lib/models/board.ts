import mongoose, { InferSchemaType, Model, Schema } from "mongoose";

import type { MongoSchemaBase } from "@/lib/models";

import type { ColumnType } from "./column";
import type { JobApplicationType } from "./job-application";

const BoardSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true,
    index: true,
  },
  columns: [
    {
      type: Schema.Types.ObjectId,
      ref: "Column",
    },
  ],
});

export type BoardType = InferSchemaType<typeof BoardSchema>;

export type PopulatedBoardType = Omit<BoardType, "columns"> &
  MongoSchemaBase & {
    columns: (Omit<ColumnType, "jobApplications"> &
      MongoSchemaBase & {
        jobApplications: (JobApplicationType & MongoSchemaBase)[];
      })[];
  };

const Board =
  (mongoose.models.Board as Model<BoardType> | undefined) ??
  mongoose.model<BoardType>("Board", BoardSchema);

export default Board;
