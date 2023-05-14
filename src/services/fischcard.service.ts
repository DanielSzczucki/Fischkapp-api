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

export const checkIsTimePassed = (card: CardPayload, minutes: number) => {
  const currentTime = new Date();
  const cardCreationTime = new Date(`${card.date}`);
  const timeDifferenceInMinutes =
    (currentTime.getTime() - cardCreationTime.getTime()) / 60000;

  return timeDifferenceInMinutes <= minutes ? true : false;
};

export const deleteCardWhenTimePassed = async (
  card: CardPayload,
  minutes: number
) => {
  const is5minutPassed = checkIsTimePassed(card, minutes);

  if (is5minutPassed) {
    //if is true, cant delete the card
    return true;
  } else {
    //if is false - delete card
    const deletedCard = await Card.findByIdAndDelete(card._id);

    //and return is false
    return false;
  }
};
