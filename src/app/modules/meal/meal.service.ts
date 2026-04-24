import { AppError } from "../../../shared/error/AppError";
import { mealsRepo } from "./meal.repository";
import { MealQueryType } from "./meal.validation";

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
  getSingleMeal: async function (id: string) {
    const meal = await mealsRepo.getSingleMeal(id);

    if (!meal) {
      throw new AppError(404, "Meal not found with this id");
    }

    return meal;
  },
};
