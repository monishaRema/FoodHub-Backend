import z from "zod";

export const createOrderSchema = z.object({
  deliveryAddress: z
    .string()
    .trim()
    .min(5, "Delivery address is too short")
    .max(255, "Delivery address is too long"),

  contactPhone: z
    .string()
    .trim()
    .min(1,"Contact phone is required"),

  items: z
    .array(
      z.object({
        mealId: z.string().pipe(z.uuid("Meal id must be a valid uuid")),
        quantity: z
          .number()
          .int()
          .positive("Quantity must be greater than 0")
      }),
    )
    .min(1, "At least one item is required")
    .superRefine((items, ctx) => {
      const ids = items.map((i) => i.mealId);
      const uniqueIds = new Set(ids);

      if (ids.length !== uniqueIds.size) {
        ctx.addIssue({
          code: "custom",
          message: "Duplicate meal items are not allowed",
        });
      }
    }),
});

export type CreateOrderType = z.infer<typeof createOrderSchema>;
