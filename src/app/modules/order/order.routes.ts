import { Router } from "express";
import { validateRequest } from "../../middleware/validateRequest.middleware.js";
import { createOrderSchema } from "./order.validation.js";
import { ordersController } from "./order.controller.js";
import { idParamsSchema, querySchema } from "../../../shared/validation/index.js";

export const orderRouter = Router();

orderRouter.post(
  "/",
  validateRequest(createOrderSchema, "body"),
  ordersController.createOrder,
);

orderRouter.get(
  "/",
  validateRequest(querySchema, "query"),
  ordersController.getOrders,
);

orderRouter.get(
  "/:id",
  validateRequest(idParamsSchema, "params"),
  ordersController.getSingleOrder,
);
orderRouter.patch(
  "/:id/cancel",
  validateRequest(idParamsSchema, "params"),
  ordersController.cancelOrder,
);
