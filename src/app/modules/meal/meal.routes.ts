import { Router } from "express";
import { mealsController } from "./meal.controller";
import { validateRequest } from "../../middleware/validateRequest.middleware";
import { idParamsSchema, querySchema } from "../../../shared/validation";
import { mealQuerySchema } from "./meal.validation";

export const mealsRouter= Router();




mealsRouter.get("/",validateRequest(mealQuerySchema,"query"),mealsController.getMeals)
mealsRouter.get("/:id",validateRequest(idParamsSchema,"params"),mealsController.getSingleMeal)
mealsRouter.get(
  "/:id/reviews",
  validateRequest(idParamsSchema, "params"),
  validateRequest(querySchema, "query"),
  mealsController.getReviewsByMealId
);