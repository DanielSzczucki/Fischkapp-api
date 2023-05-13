import { Card } from "../models/fischcardModel";
import { CardPayload } from "../utils/types";
import { HydratedDocument } from "mongoose";
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

  const firstCardData: object = {
    _id: "6443eb5708dd23f4eda841e8",
    author: "Author test",
    front: "silver fron card",
    back: "black back card",
    tags: ["random tag", "other random tag"],
    date: "2023-04-27T14:44:56.012Z",
    __v: 0,
  };

  const secondCardData = {
    author: "Author Other ",
    back: "black back card",
    front: "green fron card",
    tags: ["random tag", "other random tag"],
  };

  beforeAll(async () => {
    await connectDB();
  });

  afterAll(async () => {
    await dropDB();
  });

  beforeEach(async () => {
    //create cards
    firstCardMock = new Card(firstCardData);
    secondCardMock = new Card(secondCardData);

    //added one to db
    firstCardMock.save();
  });

  afterEach(async () => {
    await dropCollection();
  });

  it("returns a status code of 201", async () => {
    await api.post(`/cards`).send(secondCardData).expect(201);
  });

  it("create a new flashcard with the correct fields", async () => {
    const res = await api.post(`/cards`).send(firstCardData);

    const card = res.body.card;

    expect(card).toMatchObject(firstCardData);
  });

  it(" returns a status code of 400 when card with specific front value already exists", async () => {
    await api.post(`/cards`).send(firstCardData).expect(400);
  });
});
