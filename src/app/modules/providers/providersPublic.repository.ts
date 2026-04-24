import { prisma } from "../../../shared/lib/prisma";

type ProviderQueryType = {
  take: number;
  skip: number;
  sortBy: "shopName" | "createdAt" | "updatedAt";
  SortOrder: "asc" | "desc";
  search: string | null;
};

export const providersPublicRepo = {
  getProviders: async function (query: ProviderQueryType) {
    return await prisma.provider.findMany({
      ...(query.search
        ? {
            where: {
              shopName: {
                contains: query.search,
                mode: "insensitive",
              },
            },
          }
        : {}),
      take: query.take,
      skip: query.skip,
      orderBy: {
        [query.sortBy]: query.SortOrder,
      },
    });
  },
  getSingleProvider: async function (id: string) {
    return await prisma.provider.findUnique({
      where: {
        id,
      },
    });
  },
};
