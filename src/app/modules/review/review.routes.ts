import { validateRequest } from "./../../middleware/validateRequest.middleware.js";
import { Router } from "express";
import { reviewController } from "./review.controller.js";
import { createReviewSchema } from "./review.validation.js";

export const reviewRouter = Router();
// Post api/review



reviewRouter.post(
  "/",
  validateRequest(createReviewSchema, "body"),
  reviewController.createReview,
);
