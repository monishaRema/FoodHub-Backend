import { AppError } from "../../../shared/error/AppError"
import { mealsRepo } from "./meal.repository"


export const mealsService = {
    getMeals : async function(){

        return await mealsRepo.getMeals()
    },
    getSingleMeal : async function(id: string){

        const meal = await mealsRepo.getSingleMeal(id)

        if(!meal){
            throw new AppError(404,"Meal not found with this id")
        }

        return meal
    },
}