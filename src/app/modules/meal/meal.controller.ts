import { Request, Response } from "express";
import { mealsService } from "./meal.service.js";
import { sendResponse } from "../../../shared/utils/sendResponse.js";
import { AppError } from "../../../shared/error/AppError.js";
import { RequestParts } from "../../constants/index.js";

export const mealsController = {
  getMeals: async function (req: Request, res: Response) {

    const meals = await mealsService.getMeals(res.locals.query);

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

   getReviewsByMealId:async function(req:Request,res:Response){

    if(!req.params.id){
      throw new AppError(401, "Id is required");
    }
    const reviews = await mealsService.getReviewsByMealId(req.params.id as string,res.locals[RequestParts.query]);

    sendResponse({
      res,
      statusCode: 200,
      message: "Fetched reviews successfully",
      data: reviews,
    });
   },
};
