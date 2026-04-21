import { Request, Response, Router } from "express";
import { sendResponse } from "../../shared/utils/sendResponse";
import { authRouter } from "../modules/auth/auth.routes";


export const router = Router()


router.get("/", (req:Request,res:Response) => {

   sendResponse({
    res,
    statusCode:200,
    message:"Server running healthy"
   })
})

router.use("/auth",authRouter)