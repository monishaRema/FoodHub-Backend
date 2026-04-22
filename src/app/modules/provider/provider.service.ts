import { Prisma } from "../../../../generated/prisma/client";
import { AppError } from "../../../shared/error/AppError";
import { providerRepo } from "./provider.repository";
import { RegisterProviderSchemaType } from "./provider.validation";

export const providerService = {

    // Become Provider
    registerProvider: async function(data:RegisterProviderSchemaType, userId: string) {

        const existingProvider = await providerRepo.getProviderByUserId(userId)

        if(existingProvider){
            throw new AppError(409, "Provider already exists with this user id")
        }

        try {
            const newProvider = await providerRepo.registerProvider({
                userId: userId,
                shopName: data.shopName,
                address: data.address,
                shopImage: data.shopImage || null
            })

            return newProvider
        } catch (error) {
        
            if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2002") {
                throw new AppError(409, "Provider already exists with this user id")
            }

            throw error
        }
        
    },
    
    // Create Meal
    createMeal : async function() {},
    
    // Get All Meal
    getMeals : async function() {},
    
    // Get Single Meal
    getSingleMeal : async function() {},
    
    // Update Meal
    updateMeal : async function() {},
    
    // Delete Meal
    deleteMeal : async function() {},
    

}
