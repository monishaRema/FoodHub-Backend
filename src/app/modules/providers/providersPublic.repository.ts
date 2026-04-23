import { prisma } from "../../../shared/lib/prisma";

export const providersPublicRepo = {
  getProviders: async function () {
    return await prisma.provider.findMany();
  },
  getSingleProvider: async function (id: string) {
    return await prisma.provider.findUnique({
      where: {
        id,
      },
    });
  },
};
