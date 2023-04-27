import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
import { fischcardRouter } from "./routers/fischcardRouter";
import cors from "cors";
import cookieParser from "cookie-parser";
import { authMiddleware } from "./controllers/auth.controller";

const PORT = parseInt(process.env.PORT) || 4000;
const CORS_DOMAIN_ALLOWED = process.env.CORS_DOMAIN;

const app = express();

app.use(cors({ origin: CORS_DOMAIN_ALLOWED }));

app.use(express.json());
app.use("/", fischcardRouter);

app.use(cookieParser());

app.use("/", authMiddleware, fischcardRouter);

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
