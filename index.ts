import * as dotenv from "dotenv";
dotenv.config();

import express from "express";
import { fischcardRouter } from "./routers/fischcardRouter";

const PORT = parseInt(process.env.PORT) || 4000;

const app = express();

app.use(express.json());
app.use("/", fischcardRouter);

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
