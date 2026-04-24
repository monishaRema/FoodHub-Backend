import z from "zod";

export const categorySchema = z.object({
  name: z.string().trim().min(1, "Category name is required"),
});

export type CategorySchema = z.infer<typeof categorySchema>;

export const updateCategorySchema = z.object({
  name: z.string().trim().min(1, "Category name is required"),
});

export type UpdateCategorySchema = z.infer<typeof updateCategorySchema>;