import { email } from "zod";
import { Prisma } from "../../../../generated/prisma/client.js";
import { UserCreateInput } from "../../../../generated/prisma/models.js";
import { prisma } from "../../../shared/lib/prisma.js";

const safeUserSelect = {
  id: true,
  name: true,
  email: true,
  image: true,
  phone: true,
  role: true,
  status: true,
  createdAt: true,
  updatedAt: true,
} satisfies Prisma.UserSelect;

export const authRepo = {
  getUserByEmail: async (email: string) => {
    return await prisma.user.findUnique({
      where: {
        email,
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        status: true,
      },
    });
  },
  getUserByEmailWithPass: async (email: string) => {
    return await prisma.user.findUnique({
      where: {
        email,
      },
    });
  },

  getUserById: async (id: string) => {
    return prisma.user.findUnique({
      where: { id },
      select: safeUserSelect,
    });
  },

  register: async (data: UserCreateInput) => {
    return await prisma.user.create({
      data,
      select: safeUserSelect,
    });
  },

  login: async () => {},

  getMe: async () => {},
};
