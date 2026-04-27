import { Router } from "express";
import { providerController } from "./provider.controller";
import { validateRequest } from "../../middleware/validateRequest.middleware";
import {
  createMealSchema,
  providerMealQuerySchema,
  registerProviderSchema,
  updateMealSchema,
  updateOrderStatusSchema,
} from "./provider.validation";
import { authorize } from "../../middleware/authorize.middleware";
import { idParamsSchema, querySchema } from "../../../shared/validation";

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
providerRouter.get(
  "/orders/:id/status",
  validateRequest(idParamsSchema, "params"),
  validateRequest(updateOrderStatusSchema,"body"),
  providerController.getOrdersByProvider,
);


