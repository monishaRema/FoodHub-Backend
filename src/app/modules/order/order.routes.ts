import { Router } from "express";
import { validateRequest } from "../../middleware/validateRequest.middleware";
import { createOrderSchema } from "./order.validation";
import { ordersController } from "./order.controller";
import { idParamsSchema, querySchema } from "../../../shared/validation";

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
