import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
import { fischcardRouter } from "./routers/fischcardRouter";
import { errorMiddleware } from "./utils/httpExceptions";
import cors from "cors";

const PORT = parseInt(process.env.PORT) || 4000;
const CORS_DOMAIN_ALLOWED = process.env.CORS_DOMAIN;

const app = express();

app.use(cors({ origin: CORS_DOMAIN_ALLOWED }));

app.use(express.json());
app.use("/", fischcardRouter);

app.use("/", fischcardRouter);

app.use(errorMiddleware);

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
