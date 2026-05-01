import { validateRequest } from "./../../middleware/validateRequest.middleware.js";
import { Router } from "express";
import { reviewController } from "./review.controller.js";
import { createReviewSchema } from "./review.validation.js";
import { idParamsSchema } from "../../../shared/validation/index.js";

export const reviewRouter = Router();




reviewRouter.post(
  "/",
  validateRequest(createReviewSchema, "body"),
  reviewController.createReview,
);

reviewRouter.get(
  "/eligibility/:id",
  validateRequest(idParamsSchema, "params"),
  reviewController.checkEligibility,
);

