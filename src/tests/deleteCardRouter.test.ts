import { Card } from "../models/fischcardModel";
import { CardPayload } from "../utils/types";
import mongoose, { HydratedDocument, deleteModel } from "mongoose";
import supertest from 'supertest';

import { connectDB, dropDB, dropCollection } from "./setuptestdb";
import { deleteCardWhenTimePassed } from "../services/fischcard.service";

const supertestConfig: { [key: string]: string } = {
  Authorization: "secret",
};

import { app } from '../../index'

const api = supertest(app);

describe("fishCard POST router", () => {
  let firstCardMock: HydratedDocument<CardPayload>;
  let secondCardMock: HydratedDocument<CardPayload>;

  beforeAll(async () => {
    await connectDB();
  });

  afterAll(async () => {
    await dropDB();
  });

  beforeEach(async () => {
    const firstCardData = {
      _id: new mongoose.Types.ObjectId("6445eb5708dd23f4eda841e8"),
      author: "Author test",
      front: "silver fron card",
      back: "black back card",
      tags: ["random tag", "other random tag"],
      date: new Date(),
      __v: 0,
    };

    const secondCardData = {
      _id: new mongoose.Types.ObjectId("6443eb5708dd23f4eda841e8"),
      author: "Author Other ",
      back: "black back card",
      front: "orange fron card",
      tags: ["random tag", "other random tag"],
      date: new Date("2023-04-27T14:44:56.012Z"),
      __v: 0,
    };
    firstCardMock = new Card(firstCardData);
    secondCardMock = new Card(secondCardData);

    await firstCardMock.save();
    await secondCardMock.save();
  });

  afterEach(async () => {
    await dropCollection();
  });

  // it("retruns code 204 if card deleted correctly and deletes the requested flashcard if it was created less than 5 minutes ago", async () => {
  //   let deletedCard: CardPayload;

  //   const foundCard = await Card.findById({ _id: firstCardMock._id });

  //   const currentTime = new Date();
  //   const cardCreationTime = new Date(`${foundCard.date}`);
  //   const timeDifferenceInMinutes =
  //     (currentTime.getTime() - cardCreationTime.getTime()) / 60000;

  //   if (timeDifferenceInMinutes <= 5) {
  //     const deletedCard = await Card.findByIdAndDelete(foundCard._id);

  //     expect(deletedCard).toBeDefined();
  //     expect(deletedCard.author).toBe(firstCardMock.author);
  //     expect(deletedCard.front).toBe(firstCardMock.front);
  //     expect(deletedCard.back).toBe(firstCardMock.back);
  //     expect(deletedCard.tags).toStrictEqual(firstCardMock.tags);
  //   }
  // });

  // it("returns a status code of 403 if the flashcard was created more than 5 minutes ago.", async () => {
  //   try {
  //     const res = await Card.findById({ _id: secondCardMock._id });

  //     const deletedCard = await deleteCardWhenTimePassed(res, 5);
  //   } catch (error) {
  //     expect(error).toBeInstanceOf(Error);
  //   }
  // });

  it("returns a status code of 404 if the requested flashcard does not exist.", async () => {
        const card = await Card.findById({ _id: "6445eb5708dd23f4eda842e9" });

        expect(card).not.toBeTruthy()

        // You need to debug why your app returns 500 here, it should be 404
        await api.delete(`/cards/${'123'}`).expect(404);
  });
});