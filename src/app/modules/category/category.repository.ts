import { prisma } from "../../../shared/lib/prisma";

export const categoryRepo = {
  getCategories: async function () {
    return await prisma.category.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
  },
  getSingleCategory: async function (id: string) {
    return await prisma.category.findUnique({
      where: {
        id,
      },
    });
  },

  getCategoryByName: async function (name: string) {
    return await prisma.category.findUnique({
      where: {
        name,
      },
    });
  },

  createCategory: async function (data: { name: string }) {
    return await prisma.category.create({
      data,
    });
  },

  updateCategory: async function (id: string, data: { name: string }) {
    return await prisma.category.update({
      where: {
        id,
      },
      data,
    });
  },

  deleteCategory: async function (id: string) {
  return await prisma.category.delete({
    where: {
      id,
    },
  });
},




};
