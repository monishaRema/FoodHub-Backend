import { Router } from "express";
import { authController } from "./auth.controller";
import { validateRequest } from "../../middleware/validateRequest.middleware";
import { loginSchema, registerSchema } from "./auth.validation";

export const authRouter = Router()


authRouter.post("/register", validateRequest(registerSchema, "body"), authController.register)
authRouter.post("/login",validateRequest(loginSchema, "body"),authController.login)
authRouter.post("/logout",authController.logout)
authRouter.post("/refresh-token",authController.refreshToken)
authRouter.get("/me",authController.getMe)
