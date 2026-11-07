import type mongoose from "mongoose";

import type { BoardType } from "@/lib/models/board.model";
import type { ColumnType } from "@/lib/models/column.model";
import type { JobApplicationType } from "@/lib/models/job-application.model";

export * from "./board.model";
export { default as Board } from "./board.model";
export * from "./column.model";
export { default as Column } from "./column.model";
export * from "./job-application.model";
export { default as JobApplication } from "./job-application.model";

export type MongoID = mongoose.Types.ObjectId;

export interface MongoSchemaBase {
  _id: MongoID;
}

export type PopulatedJobApplicationType = MongoSchemaBase & JobApplicationType;

export type PopulatedColumnType = MongoSchemaBase &
  Omit<ColumnType, "jobApplications"> & {
    jobApplications: PopulatedJobApplicationType[];
  };

export type PopulatedBoardType = MongoSchemaBase &
  Omit<BoardType, "columns"> & {
    columns: PopulatedColumnType[];
  };
