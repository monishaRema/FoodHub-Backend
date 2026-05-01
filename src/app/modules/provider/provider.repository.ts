import { OrderStatus } from "../../../../generated/prisma/enums.js";
import {
  MealCreateManyInput,
  MealUncheckedUpdateInput,
  ProviderCreateManyInput,
} from "../../../../generated/prisma/models.js";
import { prisma } from "../../../shared/lib/prisma.js";


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

      return newProvider;
    });
  },

  getProviderByUserId: async function (userId: string) {
    return await prisma.provider.findUnique({
      where: {
        userId,
      },
    });
  },

  getUserById: async function (id: string) {
    return await prisma.user.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        role: true,
      },
    });
  },

  // Create Meal
  createMeal: async function (data: MealCreateManyInput) {
    return await prisma.meal.create({
      data: data,
    });
  },

  getCategoryById: async function (id: string) {
    return await prisma.category.findUnique({
      where: {
        id,
      },
    });
  },

  // Get All Meal
  getMeals: async function (providerId: string,take:number,skip:number) {
    return await prisma.meal.findMany({
      where: {
        providerId,
      },
      take: take,
      skip: skip,
      orderBy: {
        createdAt: "desc",
      },
      select:{
        id:true,
        name:true,
        image:true,
        price:true,
        dietary:true,
        excerpt:true,
        details:true,
        categoryId:true,
        isFeatured:true,
        availability:true,
        createdAt:true,
        updatedAt:true,
        category:{
          select:{
            name:true,
          }
        }
      }
    });
  },

  // Get Single Meal
  getSingleMeal: async function (id: string) {
    return await prisma.meal.findUnique({
      where: {
        id,
      },
      select:{
        id:true,
        name:true,
        image:true,
        price:true,
        providerId:true,
        dietary:true,
        excerpt:true,
        details:true,
        categoryId:true,
        isFeatured:true,
        availability:true,
        createdAt:true,
        updatedAt:true,
        category:{
          select:{
            name:true,
          }
        }
      }
    });
  },

  // Update Meal
  updateMeal: async function (mealId: string, data: MealUncheckedUpdateInput) {
    return await prisma.meal.update({
      where: {
        id: mealId,
      },
      data,
    });
  },

  // Delete Meal
  deleteMeal: async function (id: string) {
    return await prisma.meal.delete({
      where: {
        id,
      },
    });
  },


  getOrdersByProvider:async function(providerId:string,take:number,skip:number){

    return await prisma.order.findMany({
      where:{
        providerId
      },
      take:take,
      skip:skip,
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

        orderItems: {
          select: {
            id: true,
            mealId: true,
            mealNameSnapshot: true,
            quantity: true,
            price: true,
          },
        },
      }
    })

  },
  getOrderById:async function(orderId:string){
      return await prisma.order.findUnique({
      where:{
        id:orderId
      },
      
      select: {
        id: true,
        userId: true,
        providerId:true,
        status: true,
        totalAmount: true,
        deliveryAddress: true,
        contactPhone: true,
        createdAt: true,

        orderItems: {
          select: {
            id: true,
            mealId: true,
            mealNameSnapshot: true,
            quantity: true,
            price: true,
          },
        },
      }
    })

  },
  updateOrderStatus:async function(id:string,status:OrderStatus){

    return  await prisma.order.update({
      data:{
        status
      },
      where:{
        id
      }
    })
  }

};
