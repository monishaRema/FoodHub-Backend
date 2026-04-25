import z from "zod";
import { UserStatus } from "../../../../generated/prisma/enums";

export const userQuerySchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().max(100).default(10),
});

export type UserQueryType = z.infer<typeof userQuerySchema>;

export const userStatusSchema = z.object({
  status: z
    .enum(UserStatus, {
      message: "User status must be within active or suspended",
    })
    
});

export type UserStatusType = z.infer<typeof userStatusSchema>
