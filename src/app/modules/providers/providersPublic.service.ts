import { AppError } from "../../../shared/error/AppError";
import { providersPublicRepo } from "./providersPublic.repository";

export const providersPublicService = {
  getProviders: async function () {
    return await providersPublicRepo.getProviders();
  },
  getSingleProvider: async function (id: string) {
    const provider = await providersPublicRepo.getSingleProvider(id);

    if (!provider) {
      throw new AppError(404, "No provider found");
    }

    return provider;
  },
};
