import { Prisma } from "../../../../generated/prisma/client.js";
import { prisma } from "../../../shared/lib/prisma.js";

export const adminOrdersRepo = {
  getOrders: async function (take: number, skip: number) {
    const ordersCount = await prisma.order.count({});

    const orders = await prisma.order.findMany({
      take: take,
      skip: skip,
      orderBy: {
        createdAt: "desc",
      },
      select: {
        id: true,
        userId: true,
        status: true,
        totalAmount: true,
        deliveryAddress: true,
        contactPhone: true,
        createdAt: true,

        provider: {
          select: {
            id: true,
            shopName: true,
          },
        },
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },

        orderItems: {
          select: {
            id: true,
            mealId: true,
            mealNameSnapshot: true,
            quantity: true,
            price: true,
          },
        },
      },
    });

    return {
      data: orders,
      meta: {
        page: Math.ceil(skip / take) + 1,
        limit: take,
        totalItems: ordersCount,
        totalPage: Math.ceil(ordersCount / take),
      },
    };
  },
  getSingleOrder: async function (id: string) {
    return await prisma.order.findUnique({
      where: {
        id,
      },

      select: {
       id: true,
        userId: true,
        status: true,
        totalAmount: true,
        deliveryAddress: true,
        contactPhone: true,
        createdAt: true,

        provider: {
          select: {
            id: true,
            shopName: true,
          },
        },
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },

        orderItems: {
          select: {
            id: true,
            mealId: true,
            mealNameSnapshot: true,
            quantity: true,
            price: true,
          },
        },
      },
    });
  },
};
