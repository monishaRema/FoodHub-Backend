import { Router } from "express";
import { authorize } from "../../middleware/authorize.middleware";
import { validateRequest } from "../../middleware/validateRequest.middleware";
import { idParamsSchema } from "../../../shared/validation";
import { categoryController } from "./category.controller";
import { categorySchema, updateCategorySchema } from "./category.validation";

export const categoryRouter = Router()

categoryRouter.get("/", categoryController.getCategories)
categoryRouter.get("/:id", validateRequest(idParamsSchema, "params"), categoryController.getSingleCategory)
categoryRouter.post(
  "/",
  authorize("ADMIN"),
  validateRequest(categorySchema, "body"),
  categoryController.createCategory
);
categoryRouter.patch("/:id",authorize("ADMIN"),validateRequest(idParamsSchema,"params"),validateRequest(updateCategorySchema,"body"),categoryController.updateCategory)
categoryRouter.delete(
  "/:id",
  authorize("ADMIN"),
  validateRequest(idParamsSchema, "params"),
  categoryController.deleteCategory
);


