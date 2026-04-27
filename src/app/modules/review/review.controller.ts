import { sendResponse } from './../../../shared/utils/sendResponse';
import { Request, Response } from "express";
import { reviewService } from "./review.service";
import { AppError } from '../../../shared/error/AppError';

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
    getReview:async function(req:Request,res:Response){},
}