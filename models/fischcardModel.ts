import mongoose, { HydratedDocument, model } from "mongoose";
import { CreateCardPayload } from "../utils/types";

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
  date: {
    type: Date,
    default: Date.now,
  },
});

export const Card = model<CreateCardPayload>("Card", cardSchema);
