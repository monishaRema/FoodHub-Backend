import { Request, Response } from "express";
import { sendResponse } from "../../../shared/utils/sendResponse.js";
import { AppError } from "../../../shared/error/AppError.js";
import { RequestParts } from "../../constants/index.js";
import { adminOrdersService } from "./admin-order.service.js";

export const adminOrdersController = {
  getOrders: async function (req: Request, res: Response) {
    const orders = await adminOrdersService.getOrders(
      res.locals[RequestParts.query],
    );

    sendResponse({
      res,
      statusCode: 200,
      message: "Order fetched successfully",
      data: orders.data,
      meta: orders.meta,
    });
  },
  getSingleOrder: async function (req: Request, res: Response) {
    if (!req.params.id) {
      throw new AppError(400, "id is required");
    }
    const order = await adminOrdersService.getSingleOrder(
      req.params.id as string,
    );

    sendResponse({
      res,
      statusCode: 200,
      message: "Order fetched successfully",
      data: order,
    });
  },
};
