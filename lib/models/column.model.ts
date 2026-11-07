import mongoose, { InferSchemaType, Model, Schema } from "mongoose";

import { COLUMNS_ICONS, UI_COLORS } from "@/lib/constants";

const ColumnSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    icon: {
      type: String,
      enum: Object.keys(COLUMNS_ICONS),
    },
    color: {
      type: String,
      enum: UI_COLORS,
    },
    order: {
      type: Number,
      required: true,
      default: 0,
    },
    boardId: {
      type: Schema.Types.ObjectId,
      ref: "Board",
      required: true,
      index: true,
    },
    jobApplications: [
      {
        type: Schema.Types.ObjectId,
        ref: "JobApplication",
      },
    ],
  },
  {
    timestamps: true,
  },
);

export type ColumnType = InferSchemaType<typeof ColumnSchema>;

const Column =
  (mongoose.models.Column as Model<ColumnType> | undefined) ??
  mongoose.model<ColumnType>("Column", ColumnSchema);

export default Column;
