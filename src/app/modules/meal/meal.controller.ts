import { Request, Response } from "express";
import { mealsService } from "./meal.service";
import { sendResponse } from "../../../shared/utils/sendResponse";
import { AppError } from "../../../shared/error/AppError";

export const mealsController = {
  getMeals: async function (req: Request, res: Response) {
    const meals = await mealsService.getMeals();

    sendResponse({
      res,
      statusCode: 200,
      message: "Fetched meals successfully",
      data: meals,
    });
  },
  getSingleMeal: async function (req: Request, res: Response) {
    if (!req.params.id) {
      throw new AppError(401, "Id is required");
    }

    const meal = await mealsService.getSingleMeal(req.params.id as string);

    sendResponse({
      res,
      statusCode: 200,
      message: "Fetched meal successfully",
      data: meal,
    });
  },
};
