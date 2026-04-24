import { Router } from "express";
import { authenticate } from "../../middleware/authenticate.middleware";
import { validateRequest } from "../../middleware/validateRequest.middleware";
import { createOrderSchema } from "./order.validation";

export const orderRouter = Router()

orderRouter.post("/",authenticate,validateRequest(createOrderSchema,"body"))