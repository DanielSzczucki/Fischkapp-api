import { Card, cardSchema } from "../models/fischcardModel";
import { CardPayload, CreateCardPayload } from "../utils/types";
import mongoose, { HydratedDocument } from "mongoose";

import { connectDB, dropDB, dropCollection } from "./setuptestdb";
import { Request, Response } from "express";

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
      _id: new mongoose.Types.ObjectId("6443eb5708dd23f4eda841e8"),
      author: "Author test",
      front: "silver fron card",
      back: "black back card",
      tags: ["random tag", "other random tag"],
      date: new Date("2023-04-27T14:44:56.012Z"),
      __v: 0,
    };

    const secondCardData = {
      author: "Author Other ",
      back: "black back card",
      front: "silver fron card",
      tags: ["random tag", "other random tag"],
    };
    firstCardMock = new Card(firstCardData);
    secondCardMock = new Card(secondCardData);
  });

  afterEach(async () => {
    await dropCollection();
  });

  it("returns a status code of 201", async () => {
    const res = await firstCardMock.save();

    expect(res).toBeDefined();
  });

  it("create a new flashcard with the correct fields", async () => {
    const res = await firstCardMock.save();

    expect(res).toBeInstanceOf(Card);
    expect(res).toMatchObject(firstCardMock);
  });

  it(" returns a status code of 400 when card with specific front value already exists", async () => {
    const res = await firstCardMock.save();
    const res2 = await secondCardMock.save();

    //returned existing card
    expect(res2.front).toBe(res.front);
  });
});
