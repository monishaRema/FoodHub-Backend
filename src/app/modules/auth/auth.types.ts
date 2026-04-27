import { UserRole } from "../../../../generated/prisma/enums.js";

export type JwtPayload = {
  userId: string;
  email: string;
  role: UserRole;
};
