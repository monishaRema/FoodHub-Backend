import { Prisma } from "../../../../generated/prisma/client";
import { DietaryType, MealAvailability } from "../../../../generated/prisma/enums";
import { MealWhereInput } from "../../../../generated/prisma/models";
import { prisma } from "../../../shared/lib/prisma";

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

    return await prisma.meal.findMany({
      where: whereCondition,
      take: query.take,
      skip: query.skip,
      orderBy: {
        [query.sortBy]: query.sortOrder,
      },
    });
  },
  getSingleMeal: async function (id: string) {
    return await prisma.meal.findUnique({
      where: {
        id,
      },
    });
  },
};
