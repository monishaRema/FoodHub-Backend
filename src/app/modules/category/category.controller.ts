import { Request, Response } from "express";
import { categoryService } from "./category.service";
import { AppError } from "../../../shared/error/AppError";
import { sendResponse } from "../../../shared/utils/sendResponse";

export const categoryController = {
  getCategories: async function (_req: Request, res: Response) {
    const categories = await categoryService.getCategories();

    if (!categories) {
      throw new AppError(404, "Categories not found");
    }
    sendResponse({
      res,
      statusCode: 200,
      message: "Fetched categories successfully",
      data: categories,
    });
  },
  getSingleCategory: async function (req: Request, res: Response) {
    if (!req.params.id) {
      throw new AppError(401, "Id is required");
    }

    const category = await categoryService.getSingleCategory(
      req.params.id as string,
    );

    sendResponse({
      res,
      statusCode: 200,
      message: "Fetched category successfully",
      data: category,
    });
  },

  createCategory: async function (_req: Request, res: Response) {
    const category = await categoryService.createCategory(res.locals.body);

    sendResponse({
      res,
      statusCode: 201,
      message: "Category created successfully",
      data: category,
    });
  },

  updateCategory: async function (_req: Request, res: Response) {
    const category = await categoryService.updateCategory(
      res.locals.params.id,
      res.locals.body,
    );

    sendResponse({
      res,
      statusCode: 200,
      message: "Category updated successfully",
      data: category,
    });
  },

  deleteCategory: async function (_req: Request, res: Response) {
  const category = await categoryService.deleteCategory(res.locals.params.id);

  sendResponse({
    res,
    statusCode: 200,
    message: "Category deleted successfully",
    data: category,
  });
},

};
