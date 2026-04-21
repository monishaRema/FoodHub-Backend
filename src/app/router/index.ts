import { Request, Response, Router } from "express";
import { sendResponse } from "../../shared/utils/sendResponse";


export const router = Router()


router.get("/", (req:Request,res:Response) => {

   sendResponse({
    res,
    statusCode:200,
    message:"Server running healthy"
   })
})

