import jwt from "jsonwebtoken";
import { AppError } from "../../../shared/error/AppError";
import { config } from "../../config/env";
import { authRepo } from "./auth.repository";
import { LoginSchemaType, RegisterSchemaType } from "./auth.validation";
import bcrypt from "bcryptjs";
import { generateAccessToken, generateRefreshToken } from "./auth.utils";
import { JwtPayload } from "./auth.types";

export const authService = {
  // Register user
  register: async (payload: RegisterSchemaType) => {
    const existingUser = await authRepo.getUserByEmail(payload.email);

    if (existingUser) {
      throw new AppError(409, "User already exists with this email");
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

    return user;
  },

  //    Login
  login: async (payload: LoginSchemaType) => {
    const existingUser = await authRepo.getUserByEmailWithPass(payload.email);

    if (!existingUser) {
      throw new AppError(401, "No user found with this email");
    }

    if (existingUser.status !== "ACTIVE") {
      throw new AppError(403, "This account is not allowed to log in");
    }

    const isPasswordMatched = await bcrypt.compare(
      payload.password,
      existingUser.passwordHash,
    );

    if (!isPasswordMatched) {
      throw new AppError(401, "Invalid password");
    }

    const jwtPayload: JwtPayload = {
      userId: existingUser.id,
      email: existingUser.email,
      role: existingUser.role,
    };

    const accessToken = generateAccessToken(jwtPayload);
    const refreshToken = generateRefreshToken(jwtPayload);

    return {
      accessToken,
      refreshToken,
      user: {
        id: existingUser.id,
        name: existingUser.name,
        email: existingUser.email,
        role: existingUser.role,
        status: existingUser.status,
        phone: existingUser.phone,
        image: existingUser.image,
        createdAt: existingUser.createdAt,
        updatedAt: existingUser.updatedAt,
      },
    };
  },

  // refresh token
  refreshToken: async (token: string) => {
    try {
      const decoded = jwt.verify(
        token,
        config.JWT_REFRESH_TOKEN_SECRET,
      ) as JwtPayload;

      const user = await authRepo.getUserByEmail(decoded.email);

      if (!user) {
        throw new AppError(404, "User not found");
      }

      if (user?.status !== "ACTIVE") {
        throw new AppError(403, "This account is not allowed");
      }

      const payload: JwtPayload = {
        userId: user.id,
        email: user.email,
        role: user.role,
      };
      const generatedToken = generateAccessToken(payload);

      return generatedToken;
    } catch (error) {
      console.error(error);
      throw new AppError(401, "Refresh token is invalid or expired");
    }
  },

  getMe: async () => {},
};
