

import z from "zod";

export const createOrderSchema = z.object({
  providerId: z.uuid("Provider id must be a valid uuid"),
  deliveryAddress: z
    .string()
    .trim()
    .min(1, "Delivery address is required"),

  contactPhone: z
    .string()
    .trim()
    .min(1, "Contact phone is required"),

  items: z
    .array(
      z.object({
        mealId: z.uuid("Meal id must be a valid uuid"),
        quantity: z.number().int().positive("Quantity must be greater than 0"),
      }),
    )
    .min(1, "At least one item is required"),
});




export type CreateOrderSchema = z.infer<typeof createOrderSchema>;
