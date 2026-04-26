import { Prisma } from "../../../../generated/prisma/client";
import { prisma } from "../../../shared/lib/prisma";

type CreateOrderData = {
    userId: string;
    providerId: string;
    deliveryAddress: string;
    contactPhone: string;
    totalAmount: Prisma.Decimal;
    items: {
      mealId: string;
      mealNameSnapshot: string;
      quantity: number;
      price: Prisma.Decimal;
    }[];
}

export const ordersRepo = {
  getMealsByIds: async function (mealIds: string[]) {
    return await prisma.meal.findMany({
      where: {
        id: {
          in: mealIds,
        },
      },
      select: {
        id: true,
        providerId: true,
        name: true,
        price: true,
        availability: true,
      },
    });
  },

  createOrder: async function (data: CreateOrderData) {
    return await prisma.$transaction(async (tx) => {
      const order = await tx.order.create({
        data: {
          userId: data.userId,
          providerId: data.providerId,
          deliveryAddress: data.deliveryAddress,
          contactPhone: data.contactPhone,
          totalAmount: data.totalAmount,
          orderItems: {
            create: data.items,
          },
        },
        include: {
          orderItems: true,
        },
      });

      return order;
    });
  },
  getOrders: async function (userId: string) {
  return await prisma.order.findMany({
    where: {
      userId,
    },
    take:10,
    skip:0,
    orderBy: {
      createdAt: "desc",
    },
    select: {
      id: true,
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
  getSingleOrder: async function () {},
};
