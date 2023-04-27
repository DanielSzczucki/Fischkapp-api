import { db } from "../utils/db";
import { Card } from "../models/fischcardModel";
import { HydratedDocument, QueryOptions } from "mongoose";
import {
  CardPayload,
  CreateCardPayload,
  UpdateCardPayload,
} from "../utils/types";

type QueryRegExType = { [key: string]: { $regex: string; $options: string } };

export const getAllCardsByQuery = async (
  query: QueryRegExType
): Promise<CardPayload[]> => {
  try {
    //connect to db
    db;
    //take cards
    const allCardsByQuery = Card.find(query).sort({
      date: "asc",
    });

    return allCardsByQuery as Promise<CardPayload[]>;
  } catch (error) {
    throw error;
  }
};

export const prepareQueryForDb = (key: string, value: string) => {
  return { [key]: { $regex: value, $options: "i" } } as QueryRegExType;
};

export const cardValidationByFrontValue = async (
  cardFront: string,
  cardId: string
) => {
  //set db connection
  db;
  //check, is card with the front arleady exist in db?
  const existingCard = await Card.findOne({ front: cardFront });

  return existingCard;
};

export const updateCard = async (
  dataToUpdateCard: UpdateCardPayload,
  cardId: string
) => {
  db;
  //update card
  const updatedCard: Promise<HydratedDocument<CreateCardPayload>> =
    Card.findOneAndUpdate({ _id: cardId }, dataToUpdateCard, {
      new: true,
    });

  return updatedCard;
};

export const deleteCardWhenTimePassed = async (
  card: CardPayload,
  minutes: number
): Promise<CardPayload> => {
  const currentTime = new Date();
  const cardCreationTime = new Date(`${card.date}`);
  const timeDifferenceInMinutes =
    (currentTime.getTime() - cardCreationTime.getTime()) / (1000 * 60);

  if (timeDifferenceInMinutes <= minutes) {
    const deletedCard = Card.findByIdAndDelete(card._id);
    return deletedCard;
  }
};
