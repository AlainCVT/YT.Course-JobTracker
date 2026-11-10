import mongoose, { InferSchemaType, Model, type ObjectIdToString, Schema } from "mongoose";

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
    userId: {
      type: String,
      required: true,
      index: true,
    },
    boardId: {
      type: Schema.Types.ObjectId,
      ref: "Board",
      required: true,
      index: true,
    },
    columnId: {
      type: Schema.Types.ObjectId,
      ref: "Column",
      required: true,
      index: true,
    },
  },
  {
    timestamps: true,
  },
);

export type JobApplicationType = InferSchemaType<typeof JobApplicationSchema>;
export type JobApplicationTypeDTO = ObjectIdToString<JobApplicationType>;

const JobApplication =
  (mongoose.models.JobApplication as Model<JobApplicationType> | undefined) ??
  mongoose.model<JobApplicationType>("JobApplication", JobApplicationSchema);

export default JobApplication;
