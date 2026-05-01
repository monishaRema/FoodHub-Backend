import { Request, Response } from "express";
import { userService } from "./users.service.js";
import { RequestParts } from "../../constants/index.js";
import { sendResponse } from "../../../shared/utils/sendResponse.js";
import { AppError } from "../../../shared/error/AppError.js";

export const userController = {
  getUsers: async function (req: Request, res: Response) {
    const users = await userService.getUsers(res.locals[RequestParts.query]);

    sendResponse({
      res,
      statusCode: 200,
      message: "User Fetched successfully",
      data: users.data,
      meta: users.meta,
    });
  },
  updateUserStatus: async function (req: Request, res: Response) {
    if (!req.params.id) {
      throw new AppError(400, "Id is required");
    }

    const updatedUser = await userService.updateUserStatus(
      req.params.id as string,
      req.body,
    );

    sendResponse({
      res,
      statusCode: 200,
      message: "User updated successfully",
      data: updatedUser,
    });
  },
};
