import mongoose, { Connection } from "mongoose";

const DB_NAME = process.env.DB_NAME || "localdb";

export let db: Connection;

if (process.env.NODE_ENV !== "test") {
  mongoose.connect(`${DB_NAME}`);
  db = mongoose.connection;
  db.on("error", console.error.bind(console, "connection error"));
  db.once("open", () => {
    console.log("Connected to db");
  });
}
