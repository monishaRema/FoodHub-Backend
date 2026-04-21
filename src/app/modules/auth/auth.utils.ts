import { Response } from "express";
import { config } from "../../config/env";
import { JwtPayload } from "./auth.types";
import jwt from "jsonwebtoken";
import { CookieNameValue } from "./auth.controller";

export const generateAccessToken = (payload: JwtPayload) => {
  const options: jwt.SignOptions = {
    expiresIn:
      (config.JWT_ACCESS_TOKEN_EXPIRED_IN as jwt.SignOptions["expiresIn"]) ||
      "1h",
  };

  return jwt.sign(payload, config.JWT_ACCESS_TOKEN_SECRET, options);
};

export const generateRefreshToken = (payload: JwtPayload) => {
  const options: jwt.SignOptions = {
    expiresIn:
      (config.JWT_REFRESH_TOKEN_EXPIRED_IN as jwt.SignOptions["expiresIn"]) ||
      "7d",
  };

  return jwt.sign(payload, config.JWT_REFRESH_TOKEN_SECRET, options);
};

export const setCookie = (
  res: Response,
  cookieName:CookieNameValue,
  token: string,
  age: number,
) => {
  res.cookie(cookieName, token, {
    httpOnly: true,
    secure: config.isProduction,
    sameSite: "strict",
    maxAge: age,
  });
};

export const clearCookie = (res: Response, cookieName: CookieNameValue) => {
  res.clearCookie(cookieName, {
    httpOnly: true,
    secure: config.isProduction,
    sameSite: "strict",
  });
};
