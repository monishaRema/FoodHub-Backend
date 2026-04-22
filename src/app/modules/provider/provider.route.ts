import { Router } from "express";
import { providerController } from "./provider.controller";
import { validateRequest } from "../../middleware/validateRequest.middleware";
import {
  createMealSchema,
  registerProviderSchema,
} from "./provider.validation";
import { authorize } from "../../middleware/authorize.middleware";

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
  providerController.getMeals,
);

// GET /provider/meals/:id
providerRouter.get(
  "/meals/:id",
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
  authorize("PROVIDER"),
  providerController.updateMeal,
);

// DELETE /provider/meals/:id
providerRouter.delete(
  "/meals/:id",
  authorize("PROVIDER"),
  providerController.deleteMeal,
);
