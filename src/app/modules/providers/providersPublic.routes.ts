import { Router } from "express";
import { providersPublicController } from "./providersPublic.controller";
import { validateRequest } from "../../middleware/validateRequest.middleware";
import { idParamsSchema } from "../../../shared/validation";

export const providerPublicRouter = Router();

providerPublicRouter.get("/", providersPublicController.getProviders);
providerPublicRouter.get(
  "/:id",
  validateRequest(idParamsSchema, "params"),
  providersPublicController.getSingleProvider,
);
