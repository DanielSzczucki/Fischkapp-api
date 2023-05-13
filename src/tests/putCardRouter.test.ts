import { Card } from "../models/fischcardModel";
import { CardPayload, UpdateCardPayload } from "../utils/types";
import mongoose, { HydratedDocument } from "mongoose";
import { connectDB, dropDB, dropCollection } from "./setuptestdb";
import supertest from "supertest";
import { app } from "../../index";

const supertestConfig: { [key: string]: string } = {
  Authorization: "secret",
};

const api = supertest(app);

describe("fishCard POST router", () => {
  let firstCardMock: HydratedDocument<CardPayload>;
  let secondCardMock: HydratedDocument<CardPayload>;
  const firstCardUpdatedData: UpdateCardPayload = {
    front: "orange fron card",
    back: "gray back card",
    tags: ["random tag", "other random tag"],
  };

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
      tags: ["random tag", "other random tag", "signed"],
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

    await firstCardMock.save();
    await firstCardMock.save();
  });

  afterEach(async () => {
    await dropCollection();
  });

  it("retrund 200 code, updates the requested flashcard with the correct fields and returns the updated flashcard", async () => {
    const res = await api
      .put(`/cards/${firstCardMock._id}`)
      .send(firstCardUpdatedData);

    const card = res.body.card;

    expect(res.status).toBe(200);
    expect(card).toBeTruthy();
    expect(card.front).toBe(firstCardUpdatedData.front);
    expect(card.back).toBe(firstCardUpdatedData.back);
    expect(card.tags).toMatchObject(firstCardUpdatedData.tags);
  });
});
