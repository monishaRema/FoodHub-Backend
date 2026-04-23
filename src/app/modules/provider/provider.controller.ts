import { Request, Response } from "express";
import { AppError } from "../../../shared/error/AppError";
import { providerService } from "./provider.service";
import { sendResponse } from "../../../shared/utils/sendResponse";

export const providerController = {
  // Become Provider
  registerProvider: async function (req: Request, res: Response) {
    if (!req.user) {
      throw new AppError(403, "Forbidden: You are not authorized");
    }

    const provider = await providerService.registerProvider(
      req.body,
      req.user.userId,
    );

    sendResponse({
      res,
      statusCode: 201,
      message: "Provider registered successfully",
      data: provider,
    });
  },

  // Create Meal
  createMeal: async function (req: Request, res: Response) {
    if (!req.user) {
      throw new AppError(403, "Forbidden: You are not authorized");
    }

    const meal = await providerService.createMeal(req.body, req.user.userId);
    sendResponse({
      res,
      statusCode: 201,
      message: "Meal created successfully",
      data: meal,
    });
  },

  // Get All Meal
  getMeals: async function (req: Request, res: Response) {
    if (!req.user) {
      throw new AppError(403, "Forbidden: You are not authorized");
    }

    const meals = await providerService.getMeals(req.user.userId);
    sendResponse({
      res,
      statusCode: 200,
      message: "Fetched meals successfully",
      data: meals,
    });
  },

  // Get Single Meal
  getSingleMeal: async function (req: Request, res: Response) {
    if (!req.params.id) {
      throw new AppError(400, "Params is required");
    }

    if (!req.user) {
      throw new AppError(403, "Forbidden: You are not authorized");
    }

    const meal = await providerService.getSingleMeal(
      req.params.id as string,
      req.user.userId,
    );
    sendResponse({
      res,
      statusCode: 200,
      message: "Fetched meals successfully",
      data: meal,
    });
  },

  // Update Meal
  updateMeal: async function (req: Request, res: Response) {
    if (!req.user) {
      throw new AppError(403, "Forbidden: You are not authorized");
    }

    if (!req.params.id) {
      throw new AppError(400, "Params is required");
    }

    const updatedMeal = await providerService.updateMeal(
      req.params.id as string,
      req.body,
      req.user.userId,
    );

    sendResponse({
      res,
      statusCode: 200,
      message: "Meal updated successfully",
      data: updatedMeal,
    });
  },

  // Delete Meal
  deleteMeal: async function (req: Request, res: Response) {
    if (!req.user) {
      throw new AppError(403, "Forbidden: You are not authorized");
    }

    if (!req.params.id) {
      throw new AppError(400, "Params is required");
    }

    const deletedMeal = await providerService.deleteMeal(
      req.params.id as string,
      req.user.userId,
    );
    sendResponse({
      res,
      statusCode: 200,
      message: "Meal deleted successfully",
      data: deletedMeal,
    });
  },
};
