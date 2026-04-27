import { Router } from "express";
import { userController } from "./users.controller.js";
import { validateRequest } from "../../middleware/validateRequest.middleware.js";
import {  userStatusSchema } from "./users.validation.js";
import { idParamsSchema, querySchema } from "../../../shared/validation/index.js";

export const userRouter = Router();

/**
GET /admin/users
PATCH /admin/users/:id/status
 */

userRouter.get(
  "/",
  validateRequest(querySchema, "query"),
  userController.getUsers,
);

userRouter.patch(
  "/:id/status",
  validateRequest(idParamsSchema, "params"),
  validateRequest(userStatusSchema, "body"),
  userController.updateUserStatus,
);

