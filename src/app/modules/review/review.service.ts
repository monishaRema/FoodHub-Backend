import { OrderStatus } from "../../../../generated/prisma/enums";
import { AppError } from "../../../shared/error/AppError";
import { reviewRepo } from "./review.repository";
import { CreateReviewType } from "./review.validation";

export const reviewService = {
  createReview: async function (userId: string, payload: CreateReviewType) {
    const order = await reviewRepo.getOrderByOrderId(payload.orderId);
    if (!order) {
      throw new AppError(404, "Order not found");
    }

    if (order.userId !== userId) {
      throw new AppError(403, "You can review only your own order");
    }

    if (order.status !== OrderStatus.DELIVERED) {
      throw new AppError(
        409,
        "You can review only after the order is delivered",
      );
    }

    const orderedItem = order.orderItems.find(
      (item) => item.mealId === payload.mealId,
    );

    if (!orderedItem) {
      throw new AppError(
        400,
        "You can review only meals included in this order",
      );
    }

    const existingReview = await reviewRepo.getReviewByUserAndMeal(
      userId,
      orderedItem.mealId,
    );

    if (existingReview) {
      throw new AppError(409, "You have already reviewed this meal");
    }

    return await reviewRepo.createReview({
      userId,
      mealId: orderedItem.mealId,
      orderId: order.id,
      rating: payload.rating,
      content: payload.content,
    });
  },
  getReviews: async function () {},
};
