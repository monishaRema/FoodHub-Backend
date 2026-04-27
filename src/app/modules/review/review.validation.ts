import z from "zod";

export const createReviewSchema = z
  .object({
    mealId: z.string().pipe(z.uuid("Meal id must be a valid UUID")),

    orderId: z.string().pipe(z.uuid("Order id must be a valid UUID")),

    rating: z
      .number()
      .int("Rating must be an integer")
      .min(1, "Rating must be at least 1")
      .max(5, "Rating must be at most 5"),

    content: z
      .string()
      .trim()
      .min(3, "Review content is too short")
      .max(500, "Review content is too long"),
  })
  .strict();

export type CreateReviewType = z.infer<typeof createReviewSchema>;