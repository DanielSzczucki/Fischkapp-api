import { db } from "../utils/db";
import { Card, cardSchema } from "../models/fischcardModel";
import { CardPayload } from "../utils/types";
import mongoose, { ObjectId } from "mongoose";
import fetch from "node-fetch";

const domain = process.env.CORS_DOMAIN;
//connect to db
beforeAll(async () => {
  db;

  const firstCardData: CardPayload = {
    _id: new mongoose.Types.ObjectId("6443eb5708dd23f4eda841c0"),
    front: "blue fron card",
    back: "black back card",
    tags: ["random tag", "other random tag"],
    author: "Testowy Author",
    date: new Date("2023-04-27T14:44:56.012Z"),
  };

  const secondCardData: CardPayload = {
    _id: new mongoose.Types.ObjectId("6443eb5708dd23f4eda841c0"),
    front: "orange fron card",
    back: "yellow back card",
    tags: ["some tag", "nice random tag"],
    author: "Author Author",
    date: new Date("2023-04-27T14:45:56.012Z"),
  };

  const firstCard = new Card(firstCardData);
  const seconfCard = new Card(secondCardData);
});

describe("fishCard router", () => {
  //   beforeEach(async () => {});

  it("get all card should return status code of 200", async () => {
    //response.status
    // expect(resultss).toBe(200);
  });
});

// .

// Test that the function returns an array of flashcards in the correct order.
// Test that the function returns the correct number of flashcards.
// Test that the function returns an array of flashcards written by the requested author in the correct order.
// Test that the function returns the correct number of flashcards written by the requested author.
