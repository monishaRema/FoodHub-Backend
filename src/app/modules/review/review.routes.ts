import { validateRequest } from "./../../middleware/validateRequest.middleware";
import { Router } from "express";
import { reviewController } from "./review.controller";
import { createReviewSchema } from "./review.validation";

export const reviewRouter = Router();
// Post api/review



reviewRouter.post(
  "/",
  validateRequest(createReviewSchema, "body"),
  reviewController.createReview,
);
