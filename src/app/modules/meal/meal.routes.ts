import { Router } from "express";
import { mealsController } from "./meal.controller.js";
import { validateRequest } from "../../middleware/validateRequest.middleware.js";
import { idParamsSchema, querySchema } from "../../../shared/validation/index.js";
import { mealQuerySchema } from "./meal.validation.js";

export const mealsRouter= Router();




mealsRouter.get("/",validateRequest(mealQuerySchema,"query"),mealsController.getMeals)
mealsRouter.get("/:id",validateRequest(idParamsSchema,"params"),mealsController.getSingleMeal)
mealsRouter.get(
  "/:id/reviews",
  validateRequest(idParamsSchema, "params"),
  validateRequest(querySchema, "query"),
  mealsController.getReviewsByMealId
);
