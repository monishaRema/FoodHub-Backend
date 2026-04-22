import { NextFunction, Request, Response } from "express";

import jwt from "jsonwebtoken";
import { config } from "../config/env";
import { AppError } from "../../shared/error/AppError";
import { JwtPayload } from "../modules/auth/auth.types";

export const authenticate = (
  req: Request,
  _res: Response,
  next: NextFunction,
) => {
  const accessToken = req.cookies["access-token"];

  if (!accessToken) {
    return next(new AppError(401, "Access token required"));
  }

  try {
    const decoded = jwt.verify(
      accessToken,
      config.JWT_ACCESS_TOKEN_SECRET,
    ) as JwtPayload;
    req.user = {
      userId: decoded.userId,
      email: decoded.email,
      role: decoded.role,
    };

    next();
  } catch {
    return next(new AppError(401, "Access token is invalid or expired"));
  }
};
