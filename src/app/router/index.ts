import { authorize } from './../middleware/authorize.middleware.js';
import { authenticate } from './../middleware/authenticate.middleware.js';
import { Request, Response, Router } from "express";
import { sendResponse } from "../../shared/utils/sendResponse.js";
import { authRouter } from "../modules/auth/auth.routes.js";
import { providerRouter } from "../modules/provider/provider.route.js";
import { providerPublicRouter } from '../modules/providers/providersPublic.routes.js';
import { mealsRouter } from '../modules/meal/meal.routes.js';
import { categoryRouter } from '../modules/category/category.routes.js';
import { orderRouter } from '../modules/order/order.routes.js';
import { userRouter } from '../modules/user/users.routes.js';
import { reviewRouter } from '../modules/review/review.routes.js';



export const router = Router()


router.get("/", (_req:Request,res:Response) => {

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
router.use("/admin/category",authenticate,categoryRouter)
router.use("/admin/users",authenticate,authorize("ADMIN"),userRouter)
router.use("/orders",authenticate,orderRouter)
router.use("/reviews",authenticate,reviewRouter)
