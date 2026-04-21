import { NextFunction, Request, Response } from "express";
import z from "zod";
import { AppError } from "../../shared/error/AppError";

export const validateRequest = (
  schema: z.ZodTypeAny,
  reqParts: "body" | "params" | "query",
) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const parsedRequest = schema.safeParse(req[reqParts]);

    if (!parsedRequest.success) {
      const formateError = parsedRequest.error.issues.map((issue) => ({
        field: issue.path.join("."),
        message: issue.message,
      }));

      return next(new AppError(400, "Validation failed", formateError));
    }

    if (reqParts === "query") {
      res.locals.query ??= {};
      res.locals.query = parsedRequest.data;
    }

    req[reqParts] = parsedRequest.data;

    next();
  };
};
