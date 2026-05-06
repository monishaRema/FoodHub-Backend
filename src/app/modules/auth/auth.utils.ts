import { CookieOptions, Response } from "express";
import { config } from "../../config/env.js";
import { JwtPayload } from "./auth.types.js";
import jwt from "jsonwebtoken";
import { CookieNameValue } from "../../constants/index.js";


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

const isSecure = config.BACKEND_BASE_URL?.startsWith("https://") ?? false;

const cookieOptions: CookieOptions = {
  httpOnly: true,
  secure: isSecure,
  sameSite: isSecure ? "none" : "lax",
  path: "/",
};

export const setCookie = (
  res: Response,
  cookieName: CookieNameValue,
  token: string,
  age: number,
) => {
  res.cookie(cookieName, token, {
    ...cookieOptions,
    maxAge: age,
  });
};

export const clearCookie = (res: Response, cookieName: CookieNameValue) => {
  res.clearCookie(cookieName, cookieOptions);
};