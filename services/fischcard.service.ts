import { db } from "../utils/db";
import { Card } from "../models/fischcardModel";
import { HydratedDocument } from "mongoose";
import {
  CardPayload,
  CreateCardPayload,
  UpdateCardPayload,
} from "../utils/types";

type QueryRegExType = { [key: string]: { $regex: string; $options: string } };

export const getAllCardsByQuery = async (
  query: QueryRegExType
): Promise<CardPayload[]> => {
  //connect to db
  db;
  //take cards
  const allCardsByQuery: CardPayload[] = await Card.find(query).sort({
    date: "asc",
  });

  return allCardsByQuery;
};

export const prepareQueryForDb = (
  key: string,
  value: string
): QueryRegExType => {
  return { [key]: { $regex: value, $options: "i" } };
};

export const cardValidationByFrontValue = async (
  cardFront: string,
  cardId: string
) => {
  //set db connection
  db;
  //check, is card with the front arleady exist in db?
  const existingCard: CardPayload = await Card.findOne({ front: cardFront });

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
    (currentTime.getTime() - cardCreationTime.getTime()) / 60000;

  if (timeDifferenceInMinutes <= minutes) {
    const deletedCard = await Card.findByIdAndDelete(card._id);
    return deletedCard as CardPayload;
  } else throw Error("5 miutes passed, you cant delete the post");
};
