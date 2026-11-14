import type mongoose from "mongoose";

import type { BoardTypeDTO } from "@/lib/models/board.model";
import type { ColumnTypeDTO } from "@/lib/models/column.model";
import type { JobApplicationTypeDTO } from "@/lib/models/job-application.model";

export * from "./board.model";
export { default as Board } from "./board.model";
export * from "./column.model";
export { default as Column } from "./column.model";
export * from "./job-application.model";
export { default as JobApplication } from "./job-application.model";

export type MongoID = mongoose.Types.ObjectId;
export type MongooseDeleteResult = mongoose.DeleteResult;

export type MongoTimestampProps = mongoose.DefaultTimestampProps;

export interface MongoSchemaBase {
  _id: string;
}

export type PopulatedJobApplicationType = MongoSchemaBase & JobApplicationTypeDTO;

export type PopulatedColumnType = MongoSchemaBase &
  Omit<ColumnTypeDTO, "jobApplications"> & {
    jobApplications: PopulatedJobApplicationType[];
  };

export type PopulatedBoardType = MongoSchemaBase &
  Omit<BoardTypeDTO, "columns"> & {
    columns: PopulatedColumnType[];
  };
