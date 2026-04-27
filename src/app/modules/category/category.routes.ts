import { Router } from "express";
import { authorize } from "../../middleware/authorize.middleware.js";
import { validateRequest } from "../../middleware/validateRequest.middleware.js";
import { idParamsSchema } from "../../../shared/validation/index.js";
import { categoryController } from "./category.controller.js";
import { categorySchema, updateCategorySchema } from "./category.validation.js";

export const categoryRouter = Router();

categoryRouter.get("/",categoryController.getCategories);
categoryRouter.get(
  "/:id",
  validateRequest(idParamsSchema, "params"),
  authorize("ADMIN"),
  categoryController.getSingleCategory,
);
categoryRouter.post(
  "/",
  authorize("ADMIN"),
  validateRequest(categorySchema, "body"),
  categoryController.createCategory,
);
categoryRouter.patch(
  "/:id",
  authorize("ADMIN"),
  validateRequest(idParamsSchema, "params"),
  validateRequest(updateCategorySchema, "body"),
  categoryController.updateCategory,
);
categoryRouter.delete(
  "/:id",
  authorize("ADMIN"),
  validateRequest(idParamsSchema, "params"),
  categoryController.deleteCategory,
);
