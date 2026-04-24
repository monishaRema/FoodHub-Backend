import { Request, Response } from "express";
import { providersPublicService } from "./providersPublic.service";
import { sendResponse } from "../../../shared/utils/sendResponse";
import { AppError } from "../../../shared/error/AppError";

export const providersPublicController = {
  getProviders: async function (req: Request, res: Response) {



    const providers = await providersPublicService.getProviders(res.locals.query);

    sendResponse({
      res,
      statusCode: 200,
      message: "Fetched providers successfully",
      data: providers,
    });
  },
  getSingleProvider: async function (req: Request, res: Response) {
    if (!req.params.id) {
      throw new AppError(401, "Id is required");
    }

    const provider = await providersPublicService.getSingleProvider(
      req.params.id as string,
    );

    sendResponse({
      res,
      statusCode: 200,
      message: "Fetched providers successfully",
      data: provider,
    });
  },
};
