import { nullish } from "zod";
import { AppError } from "../../../shared/error/AppError";
import { config } from "../../config/env";
import { authRepo } from "./auth.repository";
import { RegisterSchemaType } from "./auth.validation";
import bcrypt from "bcryptjs";

export const authService = {
  register: async (payload: RegisterSchemaType) => {
    const existingUser = await authRepo.getUserByEmail(payload.email);

    if (existingUser) {
      return new AppError(409, "User already exists with this email");
    }

    const passwordHash = await bcrypt.hash(
      payload.password,
      config.BCRYPT_SALT_ROUNDS,
    );

    const user = await authRepo.register({
      name: payload.name,
      email: payload.email,
      passwordHash: passwordHash,
      phone: payload.phone || null,
      image: payload.image || null,
      role: payload.role,
      status: "ACTIVE",
    });

    return user
  },

  login: async (payload: any) => {
    return {
      user: {},
    };
  },

  getMe: async () => {},
};
