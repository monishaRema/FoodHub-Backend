import { authenticate } from './../middleware/authenticate.middleware';
import { Request, Response, Router } from "express";
import { sendResponse } from "../../shared/utils/sendResponse";
import { authRouter } from "../modules/auth/auth.routes";
import { providerRouter } from "../modules/provider/provider.route";
import { providerPublicRouter } from '../modules/providers/providersPublic.routes';
import { mealsRouter } from '../modules/meal/meal.routes';
import { categoryRouter } from '../modules/category/category.routes';



export const router = Router()


router.get("/", (req:Request,res:Response) => {

   sendResponse({
    res,
    statusCode:200,
    message:"Server running healthy"
   })
})

router.use("/auth",authRouter)
router.use("/meals", mealsRouter)
router.use("/providers",providerPublicRouter)
router.use("/provider",authenticate, providerRouter)
router.use("/category",authenticate,categoryRouter)