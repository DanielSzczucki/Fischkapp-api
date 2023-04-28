//error handling

import { NextFunction, Request, Response } from "express";

export class ValidationError extends Error {}

export const handleError = (
  error: Error,
  req: Request,
  res: Response,
  nextFunction: NextFunction
): void => {
  res.status(error instanceof ValidationError ? 400 : 500).json({
    message:
      error instanceof ValidationError ? error.message : "Something went wrong",
  });
};
