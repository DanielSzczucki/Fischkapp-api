import express from "express";
import mongoose from "mongoose";
import { Card } from "../models/fischcardModel";
import { db } from "../utils/db";

export const fischcardRouter = express.Router();

fischcardRouter.post("/cards", async (req, res) => {
  //connect to db
  db;
  const TestCard = new Card(req.body);
  console.log(req.body);

  const foundCard = await Card.find({ front: req.body.front });

  if (!foundCard) {
    await TestCard.save();

    res.json({
      message: `${req.body.front} saved `,
      card: "foundCard",
    });
  } else {
    res.status(409).json({
      message: "This card arleady exist in database",
      card: foundCard,
    });
  }
});
