import { Router } from "express";
import { validateRequest } from "../../middleware/validateRequest.middleware.js";
import { adminOrdersController } from "./admin-order.controller.js";
import {
  idParamsSchema,
  querySchema,
} from "../../../shared/validation/index.js";

export const adminOrdersRouter = Router();

adminOrdersRouter.get(
  "/",
  validateRequest(querySchema, "query"),
  adminOrdersController.getOrders,
);

adminOrdersRouter.get(
  "/:id",
  validateRequest(idParamsSchema, "params"),
  adminOrdersController.getSingleOrder,
);
