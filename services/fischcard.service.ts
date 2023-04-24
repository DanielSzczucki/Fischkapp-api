import { db } from "../utils/db";
import { Card } from "../models/fischcardModel";
import { HydratedDocument, QueryOptions } from "mongoose";
import { CreateCardPayload, UpdateCardPayload } from "../utils/types";

export const getAllCardsByQuery = async (query: QueryOptions) => {
  try {
    //connect to db
    db;
    //take cards
    const allCardsByQuery = await Card.find(query).sort({
      date: "asc",
    });

    console.log("QueryCards:", allCardsByQuery);

    return allCardsByQuery;
  } catch (error) {
    return error;
  }
};

export const prepareQueryForDb = (key: string, value: string) => {
  return { [key]: { $regex: value, $options: "i" } };
};

export const cardValidationByFrontValue = async (
  cardFront: string,
  cardId: string
) => {
  //set db connection
  db;
  //check, is card with the fron arleady exist in db?
  const existingCard = await Card.findOne({ front: cardFront });

  // if (existingCard && existingCard._id.toString() !== cardId) {
  return existingCard;
  // } else return null;
};

export const updateCard = async (
  dataToUpdateCard: UpdateCardPayload,
  cardId: string
) => {
  db;
  //update card
  const updatedCard: HydratedDocument<CreateCardPayload> =
    await Card.findOneAndUpdate({ _id: cardId }, dataToUpdateCard, {
      new: true,
    });

  return updatedCard;
};
