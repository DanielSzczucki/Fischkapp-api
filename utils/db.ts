import mongoose from "mongoose";

const DB_NAME = process.env.DB_NAME || "localdb";

mongoose.connect(`${DB_NAME}`, {});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error"));
db.once("open", () => {
  console.log("Connected to db");
});
