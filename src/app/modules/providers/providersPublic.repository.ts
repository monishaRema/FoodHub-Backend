import { prisma } from "../../../shared/lib/prisma.js";

type ProviderQueryType = {
  take: number;
  skip: number;
  sortBy: "shopName" | "createdAt" | "updatedAt";
  SortOrder: "asc" | "desc";
  search: string | null;
};

export const providersPublicRepo = {
  getProviders: async function (query: ProviderQueryType) {
    const whereClause: any = {};

    if (query.search) {
      whereClause.shopName = {
        contains: query.search,
        mode: "insensitive",
      };
    }

    const providers = await prisma.provider.findMany({
      where: whereClause,
      take: query.take,
      skip: query.skip,
      orderBy: {
        [query.sortBy]: query.SortOrder,
      },
    });
    const total = await prisma.provider.count({
      where: whereClause,
    });
    return {
      data: providers,
      meta: {
        page: Math.ceil(query.skip / query.take) + 1,
        limit: query.take,
        totalItems: total,
        totalPage: Math.ceil(total / query.take),
      },
    };
  },
  getSingleProvider: async function (id: string) {
    return await prisma.provider.findUnique({
      where: {
        id,
      },
    });
  },

   getMealsByProviderId: async function (providerId:string,take:number,skip:number) {

    const total = await prisma.meal.count({
      where: {
        providerId,
      },
    });

    const meals = await prisma.meal.findMany({
      where: {
        providerId,
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
};


