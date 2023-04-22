import express from "express";
import { Card } from "../models/fischcardModel";
import { db } from "../utils/db";
import { CreateCardPayload, UpdateCardPayload } from "../utils/types";
import { HydratedDocument } from "mongoose";

export const fischcardRouter = express.Router();

fischcardRouter
  .post("/cards", async (req, res) => {
    //connect to db
    db;

    //create nev card with body value
    const card = new Card(req.body);
    console.log(req.body);

    //check is card exist with same frnt?
    const foundCard = await Card.findOne({ front: req.body.front });

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
  })

  .put("cards/:id", async (req, res) => {
    try {
      const updatedCardData: UpdateCardPayload = req.body;

      //find card to update in db
      const foundCard: HydratedDocument<CreateCardPayload> =
        await Card.findById(req.params.id);

      if (updatedCardData.front !== foundCard.front) {
        //update card values
        Object.assign(foundCard, updatedCardData);

        foundCard.save();
        //take updated card
        const updatedCard = await Card.findById(req.params.id);

        res.json({
          message: `Card ${foundCard.front} updated`,
          card: updatedCard,
        });
      } else {
        res.status(409).json({
          message: `${updatedCardData.front} arleady exist in db`,
          card: foundCard,
        });
      }
    } catch (error) {
      res.status(500).json({
        message: "Something went wrong, please try again later",
      });
    }
  });
