import { NextFunction, Request, Response } from "express"
import { UserRoleValue } from "../constants"
import { AppError } from "../../shared/error/AppError";

export const authorize = (...roles: UserRoleValue[]) => {
    return (req: Request, _res: Response, next: NextFunction) => {

        if(!req.user){
            return next(new AppError(401, "Unauthorized"));
        }

        if(!roles.includes(req.user.role)){
            return next(new AppError(403, "Forbidden: You are not authorized"));
        }

        next();

    }
}