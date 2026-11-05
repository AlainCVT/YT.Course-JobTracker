import mongoose, { InferSchemaType, Model, Schema } from "mongoose";

const JobApplicationSchema = new Schema(
  {
    company: {
      type: String,
      required: true,
    },
    position: {
      type: String,
      required: true,
    },
    location: {
      type: String,
    },
    salary: {
      type: [Number],
      required: true,
      validate: {
        validator: (value: number[]) => value.length === 2,
        message: "Salary must contain exactly 2 numbers",
      },
    },
    url: {
      type: String,
    },
    tags: [
      {
        type: String,
      },
    ],
    description: {
      type: String,
    },
    notes: {
      type: String,
    },
    order: {
      type: Number,
      required: true,
      default: 0,
    },
    columnId: {
      type: Schema.Types.ObjectId,
      ref: "Column",
      required: true,
      index: true,
    },
    boardId: {
      type: Schema.Types.ObjectId,
      ref: "Board",
      required: true,
      index: true,
    },
    userId: {
      type: String,
      required: true,
      index: true,
    },
  },
  {
    timestamps: true,
  },
);

export type JobApplicationType = InferSchemaType<typeof JobApplicationSchema>;

const JobApplication =
  (mongoose.models.JobApplication as Model<JobApplicationType> | undefined) ??
  mongoose.model<JobApplicationType>("JobApplication", JobApplicationSchema);

export default JobApplication;
