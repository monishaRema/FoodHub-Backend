import { prisma } from "../../../shared/lib/prisma"

export const mealsRepo = {
    getMeals : async function(){
        return await prisma.meal.findMany({
            where:{
                availability: "AVAILABLE"
            }
        })
    },
    getSingleMeal : async function(id: string){
        return await prisma.meal.findUnique({
            where:{
                id
            }
        })
    },
}