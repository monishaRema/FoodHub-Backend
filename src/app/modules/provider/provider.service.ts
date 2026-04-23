import { Prisma } from "../../../../generated/prisma/client";

import { AppError } from "../../../shared/error/AppError";
import { providerRepo } from "./provider.repository";
import {
  CreteMealSchemaType,
  RegisterProviderSchemaType,
} from "./provider.validation";

export const providerService = {
  // Become Provider
  registerProvider: async function (
    data: RegisterProviderSchemaType,
    userId: string,
  ) {
    const existingProvider = await providerRepo.getProviderByUserId(userId);

    if (existingProvider) {
      throw new AppError(409, "Provider already exists with this user id");
    }

    try {
      const newProvider = await providerRepo.registerProvider({
        userId: userId,
        shopName: data.shopName,
        address: data.address,
        shopImage: data.shopImage || null,
      });

      return newProvider;
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === "P2002"
      ) {
        throw new AppError(409, "Provider already exists with this user id");
      }

      throw error;
    }
  },

  // Create Meal
  createMeal: async function (payload: CreteMealSchemaType, userId: string) {
    const provider = await providerRepo.getProviderByUserId(userId);

    if (!provider) {
      throw new AppError(404, "Provider not found with this user id");
    }

    const category = await providerRepo.getCategoryById(payload.categoryId);

    if (!category) {
      throw new AppError(404, "Category not found with this category id");
    }

    const meal = await providerRepo.createMeal({
      name: payload.name,
      image: payload.image,
      price: payload.price,
      dietary: payload.dietary,
      excerpt: payload.excerpt,
      details: payload.details,
      isFeatured: payload.isFeatured || false,
      availability: payload.availability || "AVAILABLE",
      providerId: provider.id,
      categoryId: category.id,
    });

    return meal
  },

  // Get All Meal
  getMeals: async function () {

    return await providerRepo.getMeals()
  },

  // Get Single Meal
  getSingleMeal: async function (id:string) {

    const meal = await providerRepo.getSingleMeal(id)

    if(!meal){

        throw new AppError(404, "Meal not found with this id");
    }

    return meal
  },

  // Update Meal
  updateMeal: async function () {},

  // Delete Meal
  deleteMeal: async function (mealId:string,userId:string) {

    //  
    /**
     * id = meal id
     * 1. check if this meal id exists or not 
     * 2. is this meal belongs to the right provider? provider can delete only his won meal
     * 3. hit repo getProviderByUserId  with user id 
     * 4. compare meal.provider id == provider.id
     * 5. if matched then hit repo  deleteMeal
     * 6. return to controller
     */
  },
};
