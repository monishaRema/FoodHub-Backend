import { Router } from "express";
import { userController } from "./users.controller";
import { validateRequest } from "../../middleware/validateRequest.middleware";
import { userQuerySchema, userStatusSchema } from "./users.validation";
import { idParamsSchema } from "../../../shared/validation";

export const userRouter = Router();

/**
GET /admin/users
PATCH /admin/users/:id/status
 */

userRouter.get(
  "/",
  validateRequest(userQuerySchema, "query"),
  userController.getUsers,
);
userRouter.get(
  "/:id/status",
  validateRequest(idParamsSchema, "params"),
  validateRequest(userStatusSchema, "body"),
  userController.updateUserStatus,
);
