import type mongoose from "mongoose";

import type { BoardType } from "@/lib/models/board";
import type { ColumnType } from "@/lib/models/column";
import type { JobApplicationType } from "@/lib/models/job-application";

export * from "./board";
export { default as Board } from "./board";
export * from "./column";
export { default as Column } from "./column";
export * from "./job-application";
export { default as JobApplication } from "./job-application";

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
