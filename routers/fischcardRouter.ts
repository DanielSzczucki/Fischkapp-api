import express from "express";
import { Card } from "../models/fischcardModel";
import {
  CardPayload,
  CreateCardPayload,
  UpdateCardPayload,
} from "../utils/types";
import { db } from "../utils/db";
import {
  cardValidationByFrontValue,
  deleteCardWhenTimePassed,
  getAllCardsByQuery,
  prepareQueryForDb,
  updateCard,
} from "../services/fischcard.service";
import { HydratedDocument } from "mongoose";

export const fischcardRouter = express.Router();

fischcardRouter
  .post("/cards", async (req, res) => {
    //set db connection
    db;
    //create nev card with body value
    const card: HydratedDocument<CreateCardPayload> = new Card(req.body);
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
      const cardId = req.params.id;
      const updatedCardData: UpdateCardPayload = req.body;
      const cardFrontValue = req.body.front;

      const existingCard = await cardValidationByFrontValue(
        cardFrontValue,
        cardId
      );

      if (existingCard) {
        res.status(409).json({
          message: `${cardFrontValue} arleady exist in db`,
          card: existingCard,
        });
        return;
      } else {
        // //update card
        const updatedCard = await updateCard(updatedCardData, cardId);

        res.json({
          message: `Card: ${updatedCardData.front}, updated`,
          card: updatedCard,
        });
      }
    } catch (error) {
      res.status(500).json({
        message: "Something went wrong",
      });
    }
  })

  .get("/cards", async (req, res) => {
    try {
      const query = {};
      const allCards: CardPayload[] = await getAllCardsByQuery(query);

      if (allCards) {
        res.json({
          message: `All cards are downloaded from db`,
          cards: allCards,
        });
      } else {
        res.status(404).json({
          message: `There is no cards`,
          cards: null,
        });
      }
    } catch (error) {
      res.status(500).json({
        message: "Something went wrong",
        cards: null,
      });
    }
  })

  .get("/cards/author/:author", async (req, res) => {
    try {
      const key = "author";
      const value = req.params.author;
      const query = prepareQueryForDb(key, value);
      const allCards: CardPayload[] = await getAllCardsByQuery(query);

      if (allCards) {
        res.json({
          message: `All cards by ${key}:  ${value},  are downloaded from db`,
          cards: allCards,
        });
      } else {
        res.status(404).json({
          message: `There is no cards with: ${key}: ${value}`,
          cards: null,
        });
      }
    } catch (error) {
      res.status(500).json({
        message: "Something went wrong",
        cards: null,
      });
    }
  })

  .get("/cards/tags/:tag", async (req, res) => {
    try {
      const key = "tags";
      const value = req.params.tag;
      const query = prepareQueryForDb(key, value);
      const allCards: CardPayload[] = await getAllCardsByQuery(query);

      if (allCards) {
        res.json({
          message: `All cards by ${key}:  ${value}, are downloaded from db`,
          cards: allCards,
        });
      } else {
        res.status(404).json({
          message: `There is no cards with: ${key}: ${value}`,
          cards: null,
        });
      }
    } catch (error) {
      res.status(500).json({
        message: "Something went wrong",
        cards: null,
      });
    }
  })

  .delete("/cards/:id", async (req, res) => {
    db;

    try {
      const foundCard: CardPayload = await Card.findById(req.params.id);
      //if card does'nt exist
      if (!foundCard) {
        res.status(404).json({
          message: `There is no card with id:${req.params.id}`,
          card: null,
        });
      }

      const deletedCard: CardPayload = await deleteCardWhenTimePassed(
        foundCard,
        5
      );

      res.json({
        message: `Card ${foundCard.front} Id: ${foundCard._id} was deleted`,
        card: deletedCard,
      });
    } catch (error) {
      res.status(500).json({
        message: "Something went wrong",
        cards: null,
      });
    }
  });
