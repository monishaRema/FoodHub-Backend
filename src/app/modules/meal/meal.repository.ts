import { Prisma } from "../../../../generated/prisma/client.js";
import { DietaryType, MealAvailability } from "../../../../generated/prisma/enums.js";
import { MealWhereInput } from "../../../../generated/prisma/models.js";
import { prisma } from "../../../shared/lib/prisma.js";

type MealQueryParams = {
  take: number;
  skip: number;
  sortBy: "name" | "price" | "createdAt" | "updatedAt";
  sortOrder: "asc" | "desc";
  search: string | null;
};

export const mealsRepo = {
  getMeals: async function (query: MealQueryParams) {
    const search = query.search?.trim();
    const normalizedSearch = search?.toUpperCase().replace(/[\s-]+/g, "_");

    const orConditions: MealWhereInput[] = [];

    if (search) {
      orConditions.push(
        {
          name: {
            contains: search,
            mode: Prisma.QueryMode.insensitive,
          },
        },
        {
          excerpt: {
            contains: search,
            mode: Prisma.QueryMode.insensitive,
          },
        },
        {
          details: {
            contains: search,
            mode: Prisma.QueryMode.insensitive,
          },
        },
      );

      if (normalizedSearch && normalizedSearch in DietaryType) {
        orConditions.push({
          dietary: normalizedSearch as (typeof DietaryType)[keyof typeof DietaryType],
        });
      }
    }

    const whereCondition: MealWhereInput = {
      availability: MealAvailability.AVAILABLE,
      ...(orConditions.length > 0 ? { OR: orConditions } : {}),
    };



    const total = await prisma.meal.count({
      where: whereCondition,
    });

    const meals = await prisma.meal.findMany({
      where: whereCondition,
      select:{
        id:true,
        name:true,
        image:true,
        price:true,
        providerId:true,
        dietary:true,
        excerpt:true,
        isFeatured:true,
        availability:true,
        category:{
          select:{
            name:true,
          }
        },
      },
      take: query.take,
      skip: query.skip,
      orderBy: {
        [query.sortBy]: query.sortOrder,
      },
    });
    
    return {
      data: meals,
      meta: {
        page: Math.ceil(query.skip / query.take) + 1,
        limit: query.take,
        totalItems: total,
        totalPage: Math.ceil(total / query.take),
      }
    };
  },
  getFeaturedMeals: async function (take:number, skip: number) {

    const total = await prisma.meal.count({
      where: {
        isFeatured: true,
        availability: MealAvailability.AVAILABLE,
      },
      
    });

    const meals = await prisma.meal.findMany({
      where: {
        isFeatured: true,
        availability: MealAvailability.AVAILABLE,
      },
       select:{
        id:true,
        name:true,
        image:true,
        price:true,
        providerId:true,
        dietary:true,
        excerpt:true,
        isFeatured:true,
        availability:true,
        category:{
          select:{
            name:true,
          }
        }
      },
      take: take,
      skip: skip,
    });    
    return {
      data: meals,
      meta: {
        page: Math.ceil(skip / take) + 1,
        limit: take,
        totalItems: total,
        totalPage: Math.ceil(total / take),
      }
    }


  },
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
        details:true,
        dietary:true,
        excerpt:true,
        isFeatured:true,
        availability:true,
        createdAt:true,
        updatedAt:true,
        category:{
          select:{
            name:true,
          }
        },
        provider:{
          select:{
            shopName:true,
          }
        },
        reviews:{
          select:{
            id:true,
            rating:true,
            content:true,
            createdAt:true,
           
          }
        },
      }
    });
  },
 

  getReviewsByMealId: async function (mealId:string,take:number,skip:number) {

    return await prisma.review.findMany({
        where:{
            mealId
        },
        select: {
            id: true,
            rating: true,
            content: true,
            createdAt: true,
            updatedAt: true,
        },
        take:take,
        skip:skip
    })
  },
};
