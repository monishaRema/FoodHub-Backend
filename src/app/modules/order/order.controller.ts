import { Request, Response } from "express";
import { ordersService } from "./order.service";
import { sendResponse } from "../../../shared/utils/sendResponse";
import { AppError } from "../../../shared/error/AppError";
import { RequestParts } from "../../constants";

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
  getOrders: async function (req: Request, res: Response) {
    if (!req.user) {
      throw new AppError(403, "Forbidden: User id is required");
    }
    const orders = await ordersService.getOrders(
      req.user?.userId,
      res.locals[RequestParts.query],
    );

    sendResponse({
      res,
      statusCode: 200,
      message: "Order fetched successfully",
      data: orders,
    });
  },
  getSingleOrder: async function (req: Request, res: Response) {
    if (!req.user) {
      throw new AppError(403, "Forbidden: User id is required");
    }
    if (!req.params.id) {
      throw new AppError(400, "id is required");
    }
    const order = await ordersService.getSingleOrder(
      req.params.id as string,
      req.user?.userId,
    );

    sendResponse({
      res,
      statusCode: 200,
      message: "Order fetched successfully",
      data: order,
    });
  },

  cancelOrder:async function(req: Request, res: Response){

    if (!req.user) {
      throw new AppError(403, "Forbidden: User id is required");
    }
    if (!req.params.id) {
      throw new AppError(400, "id is required");
    }
    const cancelOrder = await ordersService.cancelOrder(
      req.params.id as string,
      req.user?.userId,
    );

    sendResponse({
      res,
      statusCode: 200,
      message: "Order cancelled successfully",
      data: cancelOrder,
    });

  }
};
