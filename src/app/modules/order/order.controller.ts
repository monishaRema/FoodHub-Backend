import { Request, Response } from "express";
import { ordersService } from "./order.service";
import { sendResponse } from "../../../shared/utils/sendResponse";
import { AppError } from "../../../shared/error/AppError";

export const ordersController = {
  createOrder: async function (req: Request, res: Response) {
    if (!req.user) {
      throw new AppError(403, "Forbidden: You can not create order");
    }

    const order = await ordersService.createOrder(req.body, req.user.userId);
    sendResponse({
      res,
      statusCode: 201,
      message: "Order created successfully",
      data: order,
    });
  },
  getOrders: async function (req: Request, res: Response) {},
  getSingleOrder: async function (req: Request, res: Response) {},
};
