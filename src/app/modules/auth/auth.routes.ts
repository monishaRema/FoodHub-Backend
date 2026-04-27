import { Router } from "express";
import { authController } from "./auth.controller.js";
import { validateRequest } from "../../middleware/validateRequest.middleware.js";
import { loginSchema, registerSchema } from "./auth.validation.js";
import { authenticate } from "../../middleware/authenticate.middleware.js";

export const authRouter = Router()


authRouter.post("/register", validateRequest(registerSchema, "body"), authController.register)
authRouter.post("/login",validateRequest(loginSchema, "body"),authController.login)
authRouter.post("/logout",authController.logout)
authRouter.post("/refresh-token",authController.refreshToken)
authRouter.get("/me",authenticate,authController.getMe)
