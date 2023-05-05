import { Card, cardSchema } from "../models/fischcardModel";
import { CardPayload } from "../utils/types";
import mongoose, { Query } from "mongoose";
import { app } from "..//../index";
import request, { Request } from "supertest";
import { getAllCardsByQuery } from "../services/fischcard.service";
import supertest from "supertest";

describe("fishCard router", () => {
  const domain = process.env.CORS_DOMAIN;

  const firstCardData: CardPayload = {
    _id: new mongoose.Types.ObjectId("6443eb5708dd23f4eda841e8"),
    front: "silver fron card",
    back: "black back card",
    tags: ["random tag", "other random tag"],
    author: "Testowy Author",
    date: new Date("2023-04-27T14:44:56.012Z"),
  };

  const secondCardData: CardPayload = {
    _id: new mongoose.Types.ObjectId("6443eb5708dd23f4eda841d5"),
    author: "Other Artist",
    back: "black back card",
    front: "green fron card",
    tags: ["random tag", "other random tag"],
    date: new Date("2023-05-02T14:05:33.310Z"),
  };
  const firstCardMock = new Card(firstCardData);
  const secondCardMock = new Card(secondCardData);

  const initialCards = [firstCardMock, secondCardMock];

  describe("GET/cards", () => {
    it("get all card route, should return status code of 200", async () => {
      const res = await request(app).get("/cards");

      expect(res.status).toBe(200);
    });

    it("returns an array of flashcards in the correct order.", async () => {
      const res = await getAllCardsByQuery({});

      const firstCardDate = new Date(res[0].date);
      const secondCardDate = new Date(res[1].date);

      expect(+secondCardDate).toBeGreaterThan(+firstCardDate);
    });

    it("returns the correct number of flashcards.", async () => {
      const response = await request(app).get("/cards");
      console.log(response.body.cards);

      expect(response.body.cards).toHaveLength(3);
    });

    it("function returns an array of flashcards written by the requested author in the correct order.", async () => {
      const res = await request(app).get("/cards/author/artist");

      const firstCardDate = new Date(res.body.cards[0].date);
      const secondCardDate = new Date(res.body.cards[1].date);

      console.log(firstCardDate, secondCardDate);

      expect(+secondCardDate).toBeGreaterThan(+firstCardDate);
    });
    it(" returns the correct number of flashcards written by the requested author.", async () => {
      const res = await request(app).get("/cards/author/artist");

      expect(res.body.cards).toHaveLength(2);
    });
    it("returns the correct number of flashcards with the requested tag.", async () => {
      const res = await request(app).get("/cards/tags/other");

      expect(res.body.cards).toHaveLength(2);
    });
  });
});

const rndmArray = [
  {
    _id: "6443eb5708dd23f4eda841c0",
    author: "Testowy Author",
    back: "black back card",
    date: "2023-05-03T09:21:42.237Z",
    front: "blue fron card",
    tags: ["random tag", "other random tag"],
  },
  {
    _id: "645118adc90ca8343942a89a",
    author: "Other Artist",
    back: "black back card",
    date: "2023-05-02T14:05:33.310Z",
    front: "green fron card",
    tags: ["random tag", "other random tag"],
  },
  {
    _id: "645118c6c90ca8343942a89e",
    author: "Big Artist",
    back: "black back card",
    date: "2023-05-02T14:05:58.137Z",
    front: "red fron card",
    tags: ["random tag", "second tag"],
  },
];
