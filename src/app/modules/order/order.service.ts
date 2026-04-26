import { Prisma } from "../../../../generated/prisma/client";
import { MealAvailability } from "../../../../generated/prisma/enums";
import { AppError } from "../../../shared/error/AppError";
import { ordersRepo } from "./order.repository";
import { CreateOrderType } from "./order.validation";

export const ordersService = {
  createOrder: async function (payload: CreateOrderType, userId: string) {
    const { deliveryAddress, contactPhone, items } = payload;

    const mealIds = items.map((item) => item.mealId);

    const uniqueMealIds = [...new Set(mealIds)];

    if (uniqueMealIds.length !== mealIds.length) {
      throw new AppError(400, "Duplicate meal items are not allowed");
    }

    const meals = await ordersRepo.getMealsByIds(uniqueMealIds);

    if (meals.length !== uniqueMealIds.length) {
      throw new AppError(404, "One or more meals were not found");
    }

    for (const meal of meals) {
      if (meal.availability !== MealAvailability.AVAILABLE) {
        throw new AppError(409, `${meal.name} is not available`);
      }
    }

    const providerId = meals[0]?.providerId;

    for (const meal of meals) {
      if (meal.providerId !== providerId) {
        throw new AppError(
          409,
          "You cannot order meals from multiple providers in one order",
        );
      }
    }

    let totalAmount = new Prisma.Decimal(0);

    const mealMap = new Map(meals.map((meal) => [meal.id, meal]));

    const orderItems = items.map((item) => {
      const meal = mealMap.get(item.mealId);

      if (!meal) {
        throw new AppError(404, "Meal not found");
      }

      const lineTotal = meal.price.mul(item.quantity);
      totalAmount = totalAmount.add(lineTotal);

      return {
        mealId: meal.id,
        mealNameSnapshot: meal.name,
        quantity: item.quantity,
        price: meal.price,
      };
    });

    const order = await ordersRepo.createOrder({
      userId,
      providerId: providerId as string,
      deliveryAddress,
      contactPhone,
      totalAmount,
      items: orderItems,
    });

    return order;
  },
  getOrders: async function () {},
  getSingleOrder: async function () {},
};
