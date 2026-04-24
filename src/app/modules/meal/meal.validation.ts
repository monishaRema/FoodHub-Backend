import z from "zod";

export const mealQuerySchema = z
  .object({
    search: z.string().trim().optional(),

    page: z.coerce.number().int().positive().default(1),

    limit: z.coerce.number().int().positive().max(100).default(10),

    sortBy: z
      .enum(["createdAt", "updatedAt", "price", "name"])
      .default("createdAt"),

    sortOrder: z.enum(["asc", "desc"]).default("desc"),
  })
  .strip();

export type MealQueryType = z.infer<typeof mealQuerySchema>;
