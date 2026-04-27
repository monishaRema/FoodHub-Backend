import z from "zod";

export const idParamsSchema = z.object({
  id: z.uuid("Kindly provide a valid id")
})

export const querySchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().max(100).default(10),
});

export type QueryType = z.infer<typeof querySchema>;