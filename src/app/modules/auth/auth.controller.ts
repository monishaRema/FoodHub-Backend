import { Request, Response } from "express";
import { authService } from "./auth.service";
import { sendResponse } from "../../../shared/utils/sendResponse";
import { clearCookie, setCookie } from "./auth.utils";

const cookieNames = {
  accessToken: "access-token",
  refreshToken: "refresh-token",
} as const;

export type CookieNameKey = keyof typeof cookieNames;
export type CookieNameValue = (typeof cookieNames)[keyof typeof cookieNames];

export const authController = {
  // Register
  register: async (req: Request, res: Response) => {
    const user = await authService.register(req.body);
    sendResponse({
      res,
      statusCode: 201,
      message: "User registered successfully",
      data: user,
    });
  },

  // Login
  login: async (req: Request, res: Response) => {
    const result = await authService.login(req.body);

    setCookie(
      res,
      cookieNames.refreshToken,
      result.refreshToken,
      7 * 24 * 60 * 60 * 1000,
    );
    setCookie(res, cookieNames.accessToken, result.accessToken, 60 * 60 * 1000);

    sendResponse({
      res,
      statusCode: 200,
      message: "User logged in successfully",
      data: result.user,
    });
  },

  // Logout
  logout: async (_req: Request, res: Response) => {
    clearCookie(res, cookieNames.accessToken);
    clearCookie(res, cookieNames.refreshToken);

    sendResponse({
      res,
      statusCode: 200,
      message: "User logged out successfully",
    });
  },

  // Refresh Token
  refreshToken: async (req: Request, res: Response) => {},

  // Get my profile
  getMe: async (req: Request, res: Response) => {},
};
