import z from "zod";
import { UserStatus } from "../../../../generated/prisma/enums.js";



export const userStatusSchema = z.object({
  status: z
    .enum(UserStatus, {
      message: "User status must be within active or suspended",
    })
    
});

export type UserStatusType = z.infer<typeof userStatusSchema>
