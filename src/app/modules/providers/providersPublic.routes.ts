import { Router } from "express";
import { providersPublicController } from "./providersPublic.controller.js";
import { validateRequest } from "../../middleware/validateRequest.middleware.js";
import { idParamsSchema } from "../../../shared/validation/index.js";
import { providerQuerySchema } from "./providerPublic.validation.js";

export const providerPublicRouter = Router();

providerPublicRouter.get("/",validateRequest(providerQuerySchema, "query"), providersPublicController.getProviders);
providerPublicRouter.get(
  "/:id",
  validateRequest(idParamsSchema, "params"),
  providersPublicController.getSingleProvider,
);
