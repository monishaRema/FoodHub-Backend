import { ErrorRequestHandler, NextFunction, Request, Response } from "express";
import { AppError } from "../../shared/error/AppError";
import z from "zod";

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

  }
  else if (err instanceof z.ZodError) {

    statusCode = 400;
    message = "Validation failed";
    
    errorDetails = err.issues.map((issue) => ({
      field: issue.path.join("."),
      message: issue.message,
    }));

  } 
  else if (err instanceof Error) {
    message = err.message;
  }

  const response: ResponseType = {
    success: false,
    message: message,
  };

  if (errorDetails !== undefined) {
    response.errorDetails = errorDetails;
  }

  res.status(statusCode).send(response);
};
