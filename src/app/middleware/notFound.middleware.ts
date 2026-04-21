import { NextFunction, Request, Response } from "express";
import { AppError } from "../../shared/error/AppError";

export const notFound = (req: Request, _res: Response, next: NextFunction) => {
  return next(
    new AppError(
      404,
      `Route not found ${req.method} : ${req.originalUrl}`,
    ),
  );
};
