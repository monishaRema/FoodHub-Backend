import { DietaryType, MealAvailability } from "../../../../generated/prisma/enums";
import z from "zod";

export const registerProviderSchema = z.object({
  shopName: z.string().trim().min(1, "Shop name is required"),
  address: z.string().trim().min(1, "Shop address is required"),
  shopImage: z
    .string()
    .pipe(z.url({ message: "Shop image must be a valid URL" }))
    .optional(),
});


export type RegisterProviderSchemaType = z.infer<typeof registerProviderSchema>;


export const createMealSchema = z.object({
  name: z.string().trim().min(1, "Meal name is required"),
  image: z
    .string()
    .pipe(z.url({ message: "Meal image must be a valid URL" })),
  price: z.coerce.number().positive("Price must be greater than 0"),
  dietary: z.enum(DietaryType, {
    message: "Dietary type must be one of VEG, NON_VEG, or VEGAN",
  }),
  excerpt: z.string().trim().min(1, "Meal excerpt is required").max(100, "Excerpt can not be more than 100 char"),
  details: z.string().trim().min(1, "Meal details is required"),
  categoryId: z.string().pipe(z.uuid({message: "Invalid category id"})),
  isFeatured: z.boolean().optional(),
  availability: z.enum(MealAvailability, {
    message: "Availability must be AVAILABLE or UNAVAILABLE",
  }).optional(),
});

export type CreteMealSchemaType = z.infer<typeof createMealSchema>

export const updateMealSchema = z
  .object({
    name: z.string().trim().min(1, "Meal name is required").optional(),
    image: z
      .string()
      .pipe(z.url({ message: "Meal image must be a valid URL" }))
      .optional(),
    price: z.coerce
      .number()
      .positive("Price must be greater than 0")
      .optional(),
    dietary: z
      .enum(DietaryType, {
        message: "Dietary type must be one of VEG, NON_VEG, or VEGAN",
      })
      .optional(),
    excerpt: z
      .string()
      .trim()
      .min(1, "Meal excerpt is required")
      .max(100, "Excerpt can not be more than 100 char")
      .optional(),
    details: z.string().trim().min(1, "Meal details is required").optional(),
    categoryId: z
      .string()
      .pipe(z.uuid({ message: "Invalid category id" }))
      .optional(),
    isFeatured: z.boolean().optional(),
    availability: z
      .enum(MealAvailability, {
        message: "Availability must be AVAILABLE or UNAVAILABLE",
      })
      .optional(),
  })
  .refine((data) => Object.keys(data).length > 0, {
    message: "At least one field is required to update meal",
  });

export type UpdateMealSchemaType = z.infer<typeof updateMealSchema>;


export const idParamsSchema = z.object({
  id: z.uuid("Kindly provide a valid id")
})


