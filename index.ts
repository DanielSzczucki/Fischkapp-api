import dotenv from "dotenv";
dotenv.config();
import express from "express";
import { fischcardRouter } from "./src/routers/fischcardRouter";
import cors from "cors";
import cookieParser from "cookie-parser";
import { authMiddleware } from "./src/controllers/auth.controller";
import swaggerFile from "./swager_output.json";
import swaggerUi from "swagger-ui-express";

const PORT = parseInt(process.env.PORT) || 4000;
const CORS_DOMAIN_ALLOWED = process.env.CORS_DOMAIN;

export const app = express();

app.use(cors({ origin: CORS_DOMAIN_ALLOWED }));
app.use(express.json());
app.use(cookieParser());

app.use("/", fischcardRouter);
app.use("/doc", swaggerUi.serve, swaggerUi.setup(swaggerFile));
app.use("/", authMiddleware, fischcardRouter);

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
