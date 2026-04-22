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
