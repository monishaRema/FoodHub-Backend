import { authenticate } from './../middleware/authenticate.middleware';
import { Request, Response, Router } from "express";
import { sendResponse } from "../../shared/utils/sendResponse";
import { authRouter } from "../modules/auth/auth.routes";
import { providerRouter } from "../modules/provider/provider.route";



export const router = Router()


router.get("/", (req:Request,res:Response) => {

   sendResponse({
    res,
    statusCode:200,
    message:"Server running healthy"
   })
})

router.use("/auth",authRouter)
router.use("/provider",authenticate, providerRouter)