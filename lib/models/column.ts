import mongoose, { InferSchemaType, Model, Schema } from "mongoose";

import { COLUMNS_ICONS } from "@/lib/constants";

const ColumnSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    boardId: {
      type: Schema.Types.ObjectId,
      ref: "Board",
      required: true,
      index: true,
    },
    order: {
      type: Number,
      required: true,
      default: 0,
    },
    icon: {
      type: String,
      enum: Object.keys(COLUMNS_ICONS),
    },
    color: {
      type: String,
      enum: [
        "red",
        "orange",
        "amber",
        "yellow",
        "lime",
        "green",
        "emerald",
        "teal",
        "cyan",
        "sky",
        "blue",
        "indigo",
        "violet",
        "purple",
        "fuchsia",
        "pink",
        "rose",
      ],
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
