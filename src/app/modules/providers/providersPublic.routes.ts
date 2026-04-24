import { Router } from "express";
import { providersPublicController } from "./providersPublic.controller";
import { validateRequest } from "../../middleware/validateRequest.middleware";
import { idParamsSchema } from "../../../shared/validation";
import { providerQuerySchema } from "./providerPublic.validation";

export const providerPublicRouter = Router();

providerPublicRouter.get("/",validateRequest(providerQuerySchema, "query"), providersPublicController.getProviders);
providerPublicRouter.get(
  "/:id",
  validateRequest(idParamsSchema, "params"),
  providersPublicController.getSingleProvider,
);
