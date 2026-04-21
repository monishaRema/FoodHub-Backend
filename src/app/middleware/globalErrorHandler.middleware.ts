import { ErrorRequestHandler, NextFunction, Request, Response } from "express";
import { AppError } from "../../shared/error/AppError";

type ResponseType<T = unknown> = {
  success: boolean;
  message: string;
  errorDetails?: T;
};

export const globalErrorHandler: ErrorRequestHandler = (
  err,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  let statusCode: number = 500;
  let message: string = "Internal server error";
  let errorDetails: unknown;

  if (err instanceof AppError) {
    statusCode = err.statusCode;
    message = err.message;

    errorDetails = err.details ? err.details : undefined;
  } else if (err instanceof Error) {
    message = err.message;
  }

  const response: ResponseType = {
    success: false,
    message: message,
  };

  if (errorDetails !== undefined) {
    response.errorDetails = err.details;
  }

  res.status(statusCode).send(response);
};
