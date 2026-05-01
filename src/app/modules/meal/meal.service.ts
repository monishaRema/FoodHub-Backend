import { AppError } from "../../../shared/error/AppError.js";
import { QueryType } from "../../../shared/validation/index.js";
import { mealsRepo } from "./meal.repository.js";
import { MealQueryType } from "./meal.validation.js";

export const mealsService = {
  getMeals: async function (query: MealQueryType) {
    const take = query.limit ?? 10;
    const page = query.page ?? 1;
    const skip = (page - 1) * take;

    return await mealsRepo.getMeals({
      take,
      skip,
      sortBy: query.sortBy,
      sortOrder: query.sortOrder,
      search: query.search || null,
    });
  },
  getFeaturedMeals: async function (query: MealQueryType) {
    const take = query.limit ?? 10;
    const page = query.page ?? 1;
    const skip = (page - 1) * take;

    return await mealsRepo.getFeaturedMeals(take, skip);
  },
  getSingleMeal: async function (id: string) {
    const meal = await mealsRepo.getSingleMeal(id);

    if (!meal) {
      throw new AppError(404, "Meal not found with this id");
    }

    return meal;
  },
 

   getReviewsByMealId:async function(mealId:string,query:QueryType){

    const take = query.limit ?? 10;
    const page = query.page ?? 1;
    const skip = (page - 1) * take;

    const meal = await mealsRepo.getSingleMeal(mealId)

    if(!meal){
      throw new AppError(404, "Meal not found");
    }

    
    return await mealsRepo.getReviewsByMealId(mealId,take,skip)
   }
};
