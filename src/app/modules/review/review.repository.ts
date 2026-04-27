import { Prisma } from "../../../../generated/prisma/client";
import { prisma } from "../../../shared/lib/prisma";

export const reviewRepo = {
  createReview: async function (data: Prisma.ReviewCreateManyInput) {
    return await prisma.review.create({
      data,
    });
  },
  

  getOrderByOrderId:async function(id:string){
    return await prisma.order.findUnique({
      where:{
        id
      },
      select:{
        id:true,
        userId:true,
        providerId:true,
        status:true,
        orderItems:{
          select:{
            mealId:true
          }
        }
      }
    })
  },
  getReviewByUserAndMeal: async function (userId: string, mealId: string) {
  return await prisma.review.findUnique({
    where: {
      userId_mealId: {
        userId,
        mealId,
      },
    },
  });
},
 
};
