import z from "zod";

export const registerSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Name is required")
    .max(100, "Name cannot exceed 100 characters"),

  email: z.string().trim().toLowerCase().pipe(z.email("Invalid email address")),
  password: z
    .string()
    .trim()
    .min(6, "Password must be at least 6 characters long"),
  phone: z
    .string()
    .trim()
    .min(5, "Phone number is too short")
    .max(20, "Phone number is too long")
    .optional(),

  image: z.string().trim().pipe(z.url("Image must be a valid URL")).optional(),
});

export type RegisterSchemaType = z.infer<typeof registerSchema>;

export const loginSchema = z.object({
  email: z.string().trim().toLowerCase().pipe(z.email("Invalid email address")),
  password: z
    .string()
    .trim()
    .min(6, "Password must be at least 6 characters long"),
});

export type LoginSchemaType = z.infer<typeof loginSchema>;
