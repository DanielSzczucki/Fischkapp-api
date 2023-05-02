import { Card } from "../models/fischcardModel";
import { CardPayload } from "../utils/types";
import mongoose, { Query } from "mongoose";
import { app } from "..//../index";
import request from "supertest";
import { getAllCardsByQuery } from "../services/fischcard.service";

const domain = process.env.CORS_DOMAIN;
let server: any;

beforeEach((done) => {
  server = app;
  done();
});

afterAll((done) => {
  server.close(done);
});

describe("fishCard router", () => {
  let firstCardMock: CardPayload;
  let secondCardMock: CardPayload;
  describe("GET/cards", () => {
    beforeEach(async () => {
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

      firstCardMock = new Card(firstCardData);
      secondCardMock = new Card(secondCardData);
    });

    it("get all card route, should return status code of 200", async () => {
      const res = await request(app).get("/cards");

      expect(res.status).toBe(200);
    });

    it("returns an array of flashcards in the correct order.", async () => {
      const res = await getAllCardsByQuery({});

      const firstCardDate = new Date(res[0].date);
      const secondCardDate = new Date(res[1].date);

      console.log(firstCardDate, secondCardDate);

      expect(+firstCardDate).toBeGreaterThan(+secondCardDate);
    });
  });

  it("returns the correct number of flashcards.", async () => {
    const mockDataArr = [firstCardMock, secondCardMock];
    const findMethodMock = jest.replaceProperty(
      mongoose.Model,
      "find",
      () => mockDataArr
    );

    const cards = await Card.find({});
    expect(cards).toHaveLength(2);
  });
});

// Test that the function returns an array of flashcards written by the requested author in the correct order.
// Test that the function returns the correct number of flashcards written by the requested author.
