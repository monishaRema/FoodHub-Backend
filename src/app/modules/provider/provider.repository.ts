import { ProviderCreateManyInput } from "../../../../generated/prisma/models";
import { prisma } from "../../../shared/lib/prisma";

export const providerRepo = {
  // Become Provider
  registerProvider: async function (data: ProviderCreateManyInput) {
    return await prisma.$transaction(async (tx) => {
      const newProvider = await tx.provider.create({
        data,
      });

      await tx.user.update({
        data: {
          role: "PROVIDER",
        },
        where: {
          id: data.userId,
        },
      });

      return newProvider

    });
  },

  getProviderByUserId: async function (userId: string) {
    return await prisma.provider.findUnique({
      where: {
        userId,
      },
    });
  },

  // Create Meal
  createMeal: async function () {},

  // Get All Meal
  getMeals: async function () {},

  // Get Single Meal
  getSingleMeal: async function () {},

  // Update Meal
  updateMeal: async function () {},

  // Delete Meal
  deleteMeal: async function () {},
};
