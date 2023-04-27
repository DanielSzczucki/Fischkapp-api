//error handling

import { NextFunction, Request, Response } from "express";

export class HttpExceptions extends Error {
  status: number;
  message: string;
  constructor(status: number, message: string) {
    super(message);
    this.status = status;
    this.message = message;
  }
}

export const errorMiddleware = (
  error: HttpExceptions,
  req: Request,
  res: Response,
  nextFunction: NextFunction
): void => {
  const status = error.status || 500;
  const message = error.message || "Something went wrong";
  res.status(status).send({ status, message });
};
