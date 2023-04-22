import express from "express";
import mongoose from "mongoose";
import { Card } from "../models/fischcardModel";
import { db } from "../utils/db";

export const fischcardRouter = express.Router();

fischcardRouter.post("/cards", async (req, res) => {
  //connect to db
  db;

  //create nev card with body value
  const card = new Card(req.body);
  console.log(req.body);

  //check is card exist with same frnt?
  const foundCard = await Card.find({ front: req.body.front });

  //isnt exist in db, save to db
  if (!foundCard) {
    await card.save();
    //take saved card
    const createdCard = await Card.findOne({ front: req.body.front });

    res.json({
      message: `${req.body.front} saved `,
      card: createdCard,
    });
  } else {
    //is exist? abort and sent document
    res.status(409).json({
      message: "This card arleady exist in database",
      card: foundCard,
    });
  }
});
