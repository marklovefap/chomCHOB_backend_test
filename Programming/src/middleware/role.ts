import { NextFunction, Request, Response } from "express";
import { getUserId } from "../service/user.service";

export const admin = async (req: Request, res: Response, next: NextFunction) => {
    
    //@ts-ignore
    const user = await getUserId(req.user.userId)

    if(user?.role === 'admin'){
        return next()
    }

    return res.send('Authentication Error')

}