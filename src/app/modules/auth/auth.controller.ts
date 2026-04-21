import { Request, Response } from "express";
import { authService } from "./auth.service";
import { sendResponse } from "../../../shared/utils/sendResponse";
import { setCookie } from "./auth.utils";

export const authController = {
  register: async (req: Request, res: Response) => {
    const user = await authService.register(req.body);
    sendResponse({
      res,
      statusCode: 201,
      message: "User registered successfully",
      data: user,
    });
  },

  login: async (req: Request, res: Response) => {
    const result = await authService.login(req.body);

    setCookie(
      res,
      "refresh-token",
      result.refreshToken,
      7 * 24 * 60 * 60 * 1000,
    );
    setCookie(res, "access-token", result.accessToken, 60 * 60 * 1000);

    sendResponse({
      res,
      statusCode: 200,
      message: "User logged in successfully",
      data: result.user,
    });
  },

  getMe: async (req: Request, res: Response) => {},
};
