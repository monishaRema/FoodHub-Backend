
import { Prisma } from "../../../../generated/prisma/client.js";
import { UserStatus } from "../../../../generated/prisma/enums.js"
import { prisma } from "../../../shared/lib/prisma.js"


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

export const userRepo = {
    getUsers:async function(take:number,skip:number){

        const users = await prisma.user.findMany({
            take:take,
            skip:skip,
            select:safeUserSelect
        })
        const total = await prisma.user.count()
        return { 
            data: users,
            meta:{
                 page:  Math.floor(skip / take) + 1,
                 limit: take,
                 totalItems: total,
                 totalPage: Math.ceil(total / take)
            }
        };
    },

    getUserById:async function(id:string){
        return prisma.user.findUnique({
            where:{
                id
            },
             select:safeUserSelect
        })
    },
    updateUserStatus:async function(id:string,status:UserStatus){

        return await prisma.user.update({
            data:{status},
            where:{
                id
            },
             select:safeUserSelect
        })

    },
}
