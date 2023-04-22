import mongoose, { createConnection } from "mongoose";
import { CreateCardPayload } from "../utils/types";

export interface CreateCardModel
  extends mongoose.Model<mongoose.Document<CreateCardPayload>> {}

//comment for pullreq
export const cardSchema = new mongoose.Schema<CreateCardPayload>({
  front: {
    type: String,
    required: [true, "Front info required"],
  },
  back: {
    type: String,
    required: [true, "Back info required"],
  },
  tags: {
    type: [String],
    required: [true, "Tags required"],
  },
  author: {
    type: String,
    required: [true, "Author required"],
  },
});

export const Card: CreateCardModel = mongoose.model<
  CreateCardPayload,
  CreateCardModel
>("Card", cardSchema);
