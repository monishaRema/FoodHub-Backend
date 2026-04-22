import { Router } from "express";
import { authController } from "./auth.controller";
import { validateRequest } from "../../middleware/validateRequest.middleware";
import { loginSchema, registerSchema } from "./auth.validation";
import { authenticate } from "../../middleware/authenticate.middleware";

export const authRouter = Router()


authRouter.post("/register", validateRequest(registerSchema, "body"), authController.register)
authRouter.post("/login",validateRequest(loginSchema, "body"),authController.login)
authRouter.post("/logout",authController.logout)
authRouter.post("/refresh-token",authController.refreshToken)
authRouter.get("/me",authenticate,authController.getMe)
