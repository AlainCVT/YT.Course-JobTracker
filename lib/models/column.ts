import mongoose, { InferSchemaType, Model, Schema } from "mongoose";

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
