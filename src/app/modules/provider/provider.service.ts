import { OrderStatus, Prisma } from "../../../../generated/prisma/client";
import { MealUncheckedUpdateInput } from "../../../../generated/prisma/models";

import { AppError } from "../../../shared/error/AppError";
import { QueryType } from "../../../shared/validation";
import { providerRepo } from "./provider.repository";
import {
  CreteMealSchemaType,
  ProviderMealQueryType,
  RegisterProviderSchemaType,
  UpdateMealSchemaType,
  UpdateOrderStatusType,
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

    return meal;
  },

  // Get All Meal
  getMeals: async function (userId: string, query: ProviderMealQueryType) {
    const provider = await providerRepo.getProviderByUserId(userId);

    if (!provider) {
      throw new AppError(404, "Provider not found with this user id");
    }

    const limit = query.limit ?? 10;
    const page = query.page ?? 1;
    const skip = (page - 1) * limit;

    return await providerRepo.getMeals(provider.id, limit, skip);
  },

  // Get Single Meal
  getSingleMeal: async function (mealId: string, userId: string) {
    const provider = await providerRepo.getProviderByUserId(userId);

    if (!provider) {
      throw new AppError(404, "Provider not found with this user id");
    }

    const meal = await providerRepo.getSingleMeal(mealId);

    if (!meal) {
      throw new AppError(404, "Meal not found with this id");
    }

    if (meal.providerId !== provider.id) {
      throw new AppError(403, "Forbidden: You can view only your own meal");
    }

    return meal;
  },

  // Update Meal
  updateMeal: async function (
    mealId: string,
    payload: UpdateMealSchemaType,
    userId: string,
  ) {
    const provider = await providerRepo.getProviderByUserId(userId);

    if (!provider) {
      throw new AppError(404, "Provider not found with this user id");
    }

    const existingMeal = await providerRepo.getSingleMeal(mealId);

    if (!existingMeal) {
      throw new AppError(404, "Meal not found with this id");
    }

    if (existingMeal.providerId !== provider.id) {
      throw new AppError(403, "Forbidden: You can update only your own meal");
    }

    if (payload.categoryId) {
      const category = await providerRepo.getCategoryById(payload.categoryId);

      if (!category) {
        throw new AppError(404, "Category not found with this category id");
      }
    }

    const updateData: MealUncheckedUpdateInput = {};

    if (payload.name !== undefined) updateData.name = payload.name;
    if (payload.image !== undefined) updateData.image = payload.image;
    if (payload.price !== undefined) updateData.price = payload.price;
    if (payload.dietary !== undefined) updateData.dietary = payload.dietary;
    if (payload.excerpt !== undefined) updateData.excerpt = payload.excerpt;
    if (payload.details !== undefined) updateData.details = payload.details;
    if (payload.isFeatured !== undefined)
      updateData.isFeatured = payload.isFeatured;
    if (payload.availability !== undefined)
      updateData.availability = payload.availability;
    if (payload.categoryId !== undefined)
      updateData.categoryId = payload.categoryId;

    const updatedMeal = await providerRepo.updateMeal(mealId, updateData);

    return updatedMeal;
  },

  // Delete Meal
  deleteMeal: async function (mealId: string, userId: string) {
    const provider = await providerRepo.getProviderByUserId(userId);
    if (!provider) {
      throw new AppError(404, "Provider not found with this user id");
    }

    const meal = await providerRepo.getSingleMeal(mealId);

    if (!meal) {
      throw new AppError(404, "Meal not found with this id");
    }

    if (meal.providerId !== provider.id) {
      throw new AppError(403, "Forbidden: You can delete only your own meal");
    }

    try {
      const deletedMeal = await providerRepo.deleteMeal(mealId);
      return deletedMeal;
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === "P2003"
      ) {
        throw new AppError(
          409,
          "This meal cannot be deleted because it is already used in orders",
        );
      }

      throw error;
    }
  },

  getOrdersByProvider: async function (userId: string, query: QueryType) {
    const limit = query.limit || 10;
    const page = query.page || 1;
    const skip = (page - 1) * limit;

    const provider = await providerRepo.getProviderByUserId(userId);
    if (!provider) {
      throw new AppError(404, "Provider not found");
    }

    const orders = await providerRepo.getOrdersByProvider(
      provider.id,
      limit,
      skip,
    );

    return orders;
  },
  updateOrderStatus: async function (
    userId: string,
    orderId: string,
    payload: UpdateOrderStatusType,
  ) {
    const provider = await providerRepo.getProviderByUserId(userId);
    if (!provider) {
      throw new AppError(404, "Provider not found");
    }

    const order = await providerRepo.getOrderById(orderId);

    if (!order) {
      throw new AppError(404, "Order not found");
    }

    if (order.providerId !== provider.id) {
      throw new AppError(403, "Forbidden: You can update only your own order");
    }

    const currentStatus = order.status;
    const nextStatus = payload.status;



    const allowedTransitions: Record<OrderStatus, OrderStatus[]> = {
      [OrderStatus.PENDING]: [OrderStatus.CONFIRMED],
      [OrderStatus.CONFIRMED]: [OrderStatus.PREPARING],
      [OrderStatus.PREPARING]: [OrderStatus.READY],
      [OrderStatus.READY]: [OrderStatus.DELIVERED],
      [OrderStatus.DELIVERED]: [],
      [OrderStatus.CANCELLED]: [],
    };

    const allowedNextStatuses = allowedTransitions[currentStatus];

    if (!allowedNextStatuses.includes(nextStatus)) {
      throw new AppError(
        409,
        `Invalid status transition from ${currentStatus} to ${nextStatus}`,
      );
    }

    return await providerRepo.updateOrderStatus(orderId, nextStatus);
  },
};
