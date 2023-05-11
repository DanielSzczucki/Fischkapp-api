import { Card } from "../models/fischcardModel";
import { CardPayload } from "../utils/types";
import mongoose from "mongoose";

import { connectDB, dropDB, dropCollection } from "./setuptestdb";
import { Response } from "express";

describe("fishCard router", () => {
  let firstCardMock;
  let secondCardMock;
  let initialCards;
  beforeAll(async () => {
    await connectDB();
  });

  afterAll(async () => {
    await dropDB();
  });

  beforeEach(async () => {
    const firstCardData: CardPayload = {
      _id: new mongoose.Types.ObjectId("6443eb5708dd23f4eda841e8"),
      author: "Author test",
      front: "silver fron card",
      back: "black back card",
      tags: ["random tag", "other random tag"],
      date: new Date("2023-04-27T14:44:56.012Z"),
    };

    const secondCardData: CardPayload = {
      _id: new mongoose.Types.ObjectId("6443eb5708dd23f4eda841d5"),
      author: "Author Other ",
      back: "black back card",
      front: "green fron card",
      tags: ["random tag", "other random tag"],
      date: new Date("2023-05-02T14:05:33.310Z"),
    };
    firstCardMock = new Card(firstCardData);
    secondCardMock = new Card(secondCardData);

    initialCards = [firstCardMock, secondCardMock];

    firstCardMock.save();
    secondCardMock.save();
  });

  afterEach(async () => {
    await dropCollection();
  });

  it("get all card route, should return status code of 200", async () => {
    const res = await Card.find({});

    //express automaticlly make res.200 when its ok

    expect(res).toBeDefined();
  });

  it("returns an array of flashcards in the correct order.", async () => {
    const res = await Card.find({});

    const firstCardDate = res[0].date;

    const secondCardDate = res[1].date;

    expect(+secondCardDate).toBeGreaterThan(+firstCardDate);
  });

  it("returns the correct number of flashcards.", async () => {
    const res = await Card.find({});

    expect(res).toHaveLength(initialCards.length);
  });

  it("function returns an array of flashcards written by the requested author in the correct order.", async () => {
    const res = await Card.find({});

    const firstCardDate = new Date(res[0].date);
    const secondCardDate = new Date(res[1].date);

    expect(+secondCardDate).toBeGreaterThan(+firstCardDate);
  });

  it(" returns the correct number of flashcards written by the requested author.", async () => {
    const query = { author: { $regex: "author", $options: "i" } };
    const res = await Card.find(query).sort({
      date: "asc",
    });

    expect(res).toHaveLength(2);
  });

  it("returns the correct number of flashcards with the requested tag.", async () => {
    const query = { tags: { $regex: "other", $options: "i" } };
    const res = await Card.find(query).sort({
      date: "asc",
    });
    expect(res).toHaveLength(initialCards.length);
  });
});
