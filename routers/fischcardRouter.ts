import express from "express";
import { Card } from "../models/fischcardModel";

import {
  CardPayload,
  CreateCardPayload,
  UpdateCardPayload,
} from "../utils/types";
import { HydratedDocument } from "mongoose";
import { db } from "../utils/db";

export const fischcardRouter = express.Router();

fischcardRouter
  .post("/cards", async (req, res) => {
    //set db connection
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
  })

  .put("/cards/:id", async (req, res) => {
    try {
      //set db connection
      db;
      const updatedCardData: UpdateCardPayload = req.body;

      //check, is card with the fron arleady exist in db?
      const existingCard = await Card.findOne({ front: updatedCardData.front });

      if (existingCard && existingCard._id.toString() !== req.params.id) {
        res.status(409).json({
          message: `${updatedCardData.front} arleady exist in db`,
          card: existingCard,
        });
        return;
      }

      //update card
      const updatedCard: HydratedDocument<CreateCardPayload> =
        await Card.findOneAndUpdate({ _id: req.params.id }, updatedCardData, {
          new: true,
        });

      if (updatedCard) {
        res.json({
          message: `Card ${updatedCard.front} updated`,
          card: updatedCard,
        });
      } else {
        res.status(404).json({
          message: `Card with ID ${req.params.id} not found`,
        });
      }
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  })

  .get("/cards", async (req, res) => {
    try {
      //set db connection
      db;
      const allCards = await Card.find({}).sort({ date: "asc" });

      if (!allCards) {
        res.json({
          message: "There is no cards",
          cards: null,
        });
      } else {
        res.json({
          message: "All cards are downloaded from db",
          cards: allCards,
        });
      }
    } catch (error) {
      res.status(500).json({
        message: error.message,
        cards: null,
      });
    }
  })

  .get("/cards/author/:autor", async (req, res) => {
    try {
      //set db connection
      db;
      const allCardsByAuthor = await Card.find({
        author: { $regex: req.params.autor, $options: "i" },
      }).sort({
        date: "asc",
      });

      if (!allCardsByAuthor) {
        res.json({
          message: `There is no cards with tag: ${req.params.autor}`,
          cards: null,
        });
      } else {
        res.json({
          message: `All cards by tag:  ${req.params.autor}  are downloaded from db`,
          cards: allCardsByAuthor,
        });
      }
    } catch (error) {
      res.status(500).json({
        message: error.message,
        cards: null,
      });
    }
  })

  .get("/cards/tags/:tag", async (req, res) => {
    try {
      //set db connection
      db;
      const allCardsByTag = await Card.find({
        tags: { $regex: req.params.tag, $options: "i" },
      }).sort({
        date: "asc",
      });

      if (!allCardsByTag) {
        res.json({
          message: `There is no cards with tag: ${req.params.tag}`,
          cards: null,
        });
      } else {
        res.json({
          message: `All cards by tag:  ${req.params.tag}  are downloaded from db`,
          cards: allCardsByTag,
        });
      }
    } catch (error) {
      res.status(500).json({
        message: error.message,
        cards: null,
      });
    }
  })
  .delete("/card/:id", async (req, res) => {
    //set db connection
    db;
    //find card
    const foundCardById: CardPayload = await Card.findOne({
      _id: req.params.id,
    });

    if (!foundCardById) {
      res.json({
        message: `There is no card with id:${req.params.id}`,
        card: null,
      });
    }
    //if 5 minutes have passed since it was added
    const currentTime = new Date();
    const createdAtTime = new Date(`${foundCardById.date}`);
    const timeDifferenceInMinutes =
      (currentTime.getTime() - createdAtTime.getTime()) / (1000 * 60);

    if (timeDifferenceInMinutes < 5) {
      res.status(403).json({
        message:
          "Cannot delete card until 5 minutes have passed since creation time",
        card: null,
      });
    } else {
      //find and delete
      const deletedCard = await Card.findByIdAndRemove({ _id: req.params.id });

      res.json({
        message: `Deleted card with id: ${req.params.id}`,
        card: deletedCard,
      });
    }
  });
