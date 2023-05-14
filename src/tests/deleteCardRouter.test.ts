import { Card } from "../models/fischcardModel";
import { CardPayload } from "../utils/types";
import mongoose, { HydratedDocument } from "mongoose";
import supertest from "supertest";
import { connectDB, dropDB, dropCollection } from "./setuptestdb";
import { app } from "../../index";

const supertestConfig: { [key: string]: string } = {
  Authorization: "secret",
};

const api = supertest(app);

describe("fishCard DELETE router", () => {
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

  it("retruns code 204 if card deleted correctly and deletes the requested flashcard if it was created less than 5 minutes ago", async () => {
    const deletedCard = await api
      .delete(`/cards/${firstCardMock._id}`)
      .expect(204);
  });

  it("returns a status code of 403 if the flashcard was created more than 5 minutes ago.", async () => {
    const deletedCard = await api
      .delete(`/cards/${secondCardMock._id}`)
      .expect(403);
  });

  it("returns a status code of 404 if the requested flashcard does not exist.", async () => {
    const card = await Card.findById("6413eb5708dd23f4eda841e8");

    expect(card).not.toBeTruthy();

    await api.delete(`/cards/${"6447eb5708dd23f4eda841e8"}`).expect(404);
  });
});
