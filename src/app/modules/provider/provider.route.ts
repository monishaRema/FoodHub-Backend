import { Router } from "express";
import { providerController } from "./provider.controller.js";
import { validateRequest } from "../../middleware/validateRequest.middleware.js";
import {
  createMealSchema,
  providerMealQuerySchema,
  registerProviderSchema,
  updateMealSchema,
  updateOrderStatusSchema,
} from "./provider.validation.js";
import { authorize } from "../../middleware/authorize.middleware.js";
import { idParamsSchema, querySchema } from "../../../shared/validation/index.js";

export const providerRouter = Router();

// api/provider/profile
providerRouter.post(
  "/profile",
  validateRequest(registerProviderSchema, "body"),
  providerController.registerProvider,
);

// GET api/provider/meals
providerRouter.get(
  "/meals",
  authorize("PROVIDER"),
  validateRequest(providerMealQuerySchema, "query"),
  providerController.getMeals,
);

// GET /provider/meals/:id
providerRouter.get(
  "/meals/:id",
  validateRequest(idParamsSchema, "params"),
  authorize("PROVIDER"),
  providerController.getSingleMeal,
);

// POST /provider/meals
providerRouter.post(
  "/meals",
  authorize("PROVIDER"),
  validateRequest(createMealSchema, "body"),
  providerController.createMeal,
);

// PATCH /provider/meals/:id
providerRouter.patch(
  "/meals/:id",
  validateRequest(idParamsSchema, "params"),
  validateRequest(updateMealSchema, "body"),
  authorize("PROVIDER"),
  providerController.updateMeal,
);

// DELETE /provider/meals/:id
providerRouter.delete(
  "/meals/:id",
  validateRequest(idParamsSchema, "params"),
  authorize("PROVIDER"),
  providerController.deleteMeal,
);

providerRouter.get(
  "/orders",
  validateRequest(querySchema, "query"),
  providerController.getOrdersByProvider,
);
providerRouter.patch(
  "/orders/:id/status",
  validateRequest(idParamsSchema, "params"),
  validateRequest(updateOrderStatusSchema,"body"),
  providerController.updateOrderStatus,
);




