import mongoose, { InferSchemaType, Model, type ObjectIdToString, Schema } from "mongoose";

const BoardSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
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
export type BoardTypeDTO = ObjectIdToString<BoardType>;

const Board =
  (mongoose.models.Board as Model<BoardType> | undefined) ??
  mongoose.model<BoardType>("Board", BoardSchema);

export default Board;
