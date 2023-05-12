import { Card } from "../models/fischcardModel";
import { CardPayload } from "../utils/types";
import mongoose, { HydratedDocument } from "mongoose";

import { connectDB, dropDB, dropCollection } from "./setuptestdb";

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

    await firstCardMock.save();
    await firstCardMock.save();
  });

  afterEach(async () => {
    await dropCollection();
  });

  it("retrund 200 code, updates the requested flashcard with the correct fields and returns the updated flashcard", async () => {
    const dataToUpdateCard = {
      back: "yellow bck card",
      tags: ["good tag", "random tag", "other random tag"],
    };
    const res = await Card.findOneAndUpdate(
      { _id: firstCardMock.id },
      dataToUpdateCard,
      { new: true }
    );

    expect(res).toBeDefined();
    expect(res.back && res.tags).toMatchObject(
      dataToUpdateCard.back && dataToUpdateCard.tags
    );
  });
});
