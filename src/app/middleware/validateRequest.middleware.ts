import { NextFunction, Request, Response } from "express";
import z from "zod";
import { AppError } from "../../shared/error/AppError.js";
import { ReqPartsValue, RequestParts } from "../constants/index.js";

export const validateRequest = (
  schema: z.ZodTypeAny,
  reqParts: ReqPartsValue,
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

    res.locals[reqParts] = parsedRequest.data;

    
    if (reqParts !== RequestParts.query) {
      req[reqParts] = parsedRequest.data;
    }

    next();
  };
};
