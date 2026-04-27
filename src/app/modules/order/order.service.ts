import { Prisma } from "../../../../generated/prisma/client";
import {
  MealAvailability,
  OrderStatus,
} from "../../../../generated/prisma/enums";
import { AppError } from "../../../shared/error/AppError";
import { QueryType } from "../../../shared/validation";
import { ordersRepo } from "./order.repository";
import { CreateOrderType } from "./order.validation";

const cancellableStatuses: OrderStatus[] = [
  OrderStatus.PENDING,
  OrderStatus.CONFIRMED,
];

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
  getOrders: async function (userId: string, query: QueryType) {
    const limit = query.limit || 10;
    const page = query.page || 1;
    const skip = (page - 1) * limit;

    const orders = await ordersRepo.getOrders(userId, limit, skip);
    if (orders.length == 0) {
      throw new AppError(401, "YOu didn't create any order yet");
    }

    return orders;
  },
  getSingleOrder: async function (id: string, userId: string) {
    const order = await ordersRepo.getSingleOrder(id);

    if (!order) {
      throw new AppError(404, "No order found");
    }

    if (order.userId !== userId) {
      throw new AppError(403, "Forbidden: You can view only your own order");
    }

    return order;
  },
  cancelOrder: async function (id: string, userId: string) {
    const order = await ordersRepo.getSingleOrder(id);
    if (!order) {
      throw new AppError(404, "No order found");
    }

    if (order.userId !== userId) {
      throw new AppError(403, "Forbidden: You can cancel only your own order");
    }

    if (!cancellableStatuses.includes(order.status)) {
      throw new AppError(
        409,
        `Order cannot be cancelled after it is ${order.status}`,
      );
    }

    const cancelledOrder = await ordersRepo.cancelOrder(id);

    return cancelledOrder;
  },
};
