import mongoose from "mongoose";

export const cardSchema = new mongoose.Schema({
  front: {
    type: String,
    required: true,
  },
  back: {
    type: String,
    required: true,
  },
  tags: {
    type: [String],
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
});

export const card = new mongoose.Model("card", cardSchema);
