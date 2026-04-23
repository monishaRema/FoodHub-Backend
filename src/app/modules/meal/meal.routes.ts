import { Router } from "express";
import { mealsController } from "./meal.controller";
import { validateRequest } from "../../middleware/validateRequest.middleware";
import { idParamsSchema } from "../../../shared/validation";

export const mealsRouter= Router();

/**
GET /meals
GET /meals/:id
GET /providers
GET /providers/:id
 */


mealsRouter.get("/",mealsController.getMeals)
mealsRouter.get("/:id",validateRequest(idParamsSchema,"params"),mealsController.getSingleMeal)