import { sendResponse } from './../../../shared/utils/sendResponse.js';
import { Request, Response } from "express";
import { reviewService } from "./review.service.js";
import { AppError } from '../../../shared/error/AppError.js';

export const reviewController = {
    createReview:async function(req:Request,res:Response){

        if(!req.user){
            throw new AppError(403,"Forbidden: You can not create review")
        }

        const review = await reviewService.createReview(req.user.userId,req.body)

        sendResponse({
            res,
            statusCode:201,
            message:"Review created successfully",
            data:review
        })

    },
    checkEligibility:async function(req:Request,res:Response){

        if(!req.user){
            throw new AppError(403,"Forbidden: You can not check eligibility")
        }


        const eligibility = await reviewService.checkEligibility(req.user.userId,req.params.id as string)

        sendResponse({
            res,
            statusCode:200,
            message:"Eligibility checked successfully",
            data:eligibility
        })

    },
   
}
