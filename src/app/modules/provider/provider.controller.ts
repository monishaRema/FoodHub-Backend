import { Request, Response } from "express";
import { AppError } from "../../../shared/error/AppError";
import { providerService } from "./provider.service";
import { sendResponse } from "../../../shared/utils/sendResponse";

export const providerController = {

    // Become Provider
    registerProvider: async function(req:Request, res:Response) {

        if(!req.user){
            throw new AppError(403, "Forbidden: You are not authorized")
        }

        const provider = await providerService.registerProvider(req.body, req.user.userId )

        sendResponse({
            res,
            statusCode:201,
            message: "Provider registered successfully",
            data: provider
        })


        
    },
    
    // Create Meal
    createMeal : async function(req:Request, res:Response) {
         if(!req.user){
            throw new AppError(403, "Forbidden: You are not authorized")
        }

        const meal = await providerService.createMeal(req.body, req.user.userId)
         sendResponse({
            res,
            statusCode:201,
            message: "Meal created successfully",
            data: meal
        })

    },
    
    // Get All Meal
    getMeals : async function(req:Request, res:Response) {},
    
    // Get Single Meal
    getSingleMeal : async function(req:Request, res:Response) {},
    
    // Update Meal
    updateMeal : async function(req:Request, res:Response) {},
    
    // Delete Meal
    deleteMeal : async function(req:Request, res:Response) {},
    

}