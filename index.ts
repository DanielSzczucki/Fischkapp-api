import * as dotenv from "dotenv";
dotenv.config();

import express from "express";

const app = express();

app.use(express.json());

app.listen(parseInt(process.env.PORT), "0.0.0.0", () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
