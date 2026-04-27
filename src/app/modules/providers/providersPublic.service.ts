import { AppError } from "../../../shared/error/AppError.js";
import { ProviderQueryType } from "./providerPublic.validation.js";
import { providersPublicRepo } from "./providersPublic.repository.js";

export const providersPublicService = {
  getProviders: async function (query: ProviderQueryType) {
    const limit = query.limit ?? 10;
    const page = query.page ?? 1;
    const skip = (page - 1) * limit;

    return await providersPublicRepo.getProviders({
      take: limit,
      skip: skip,
      sortBy: query.sortBy,
      SortOrder: query.sortOrder,
      search: query.search || null,
    });
  },
  getSingleProvider: async function (id: string) {
    const provider = await providersPublicRepo.getSingleProvider(id);

    if (!provider) {
      throw new AppError(404, "No provider found");
    }

    return provider;
  },
};
