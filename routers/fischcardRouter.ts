import express from "express";
import mongoose from "mongoose";
import { cardSchema } from "../models/fischcardModel";

export const fischcardRouter = express.Router();

const card = new mongoose.Model("card", cardSchema);
//make mockup
//make db

fischcardRouter.post("/cards", (req, res) => {
  //take cads or one cards
  //find card?
  //is exist - cant add - show notification and abort
  //isnt exist, save to db
});
