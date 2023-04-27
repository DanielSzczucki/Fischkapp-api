import { NextFunction, Request, Response } from "express";
import { ValidationError } from "../utils/handleError";

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const cookie = req.headers;
  console.log(cookie);
  const myAuthHeader = process.env.HEADER_AUTH_SECRET;
  console.log("MyAuthHeader", myAuthHeader);

  try {
    if (cookie && cookie.authorization === myAuthHeader) {
      next();
    } else {
      throw new ValidationError("Something went wrong with authentication");
    }
  } catch (error) {
    res.status(403).json({
      message: error.message,
    });
  }
};
