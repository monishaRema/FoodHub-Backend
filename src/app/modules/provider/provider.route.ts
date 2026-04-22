import { Router } from "express";
import { providerController } from "./provider.controller";
import { validateRequest } from "../../middleware/validateRequest.middleware";
import { registerProviderSchema } from "./provider.validation";

export const providerRouter = Router();

// api/provider/profile
providerRouter.post("/profile",validateRequest(registerProviderSchema,"body"),providerController.registerProvider )


// GET api/provider/meals
providerRouter.get("/meals", providerController.getMeals )

// GET /provider/meals/:id
providerRouter.get("/meals/:id", providerController.getSingleMeal )


// POST /provider/meals
providerRouter.post("/meals", providerController.createMeal)


// PATCH /provider/meals/:id
providerRouter.patch("/meals/:id", providerController.updateMeal)

// DELETE /provider/meals/:id
providerRouter.delete("/meals/:id", providerController.deleteMeal )
 

