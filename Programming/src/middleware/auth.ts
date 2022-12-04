import express, { NextFunction, Request, Response } from "express";
import { verifyJwt } from "../util/jwt.util";

export const auth = (req: Request, res: Response, next: NextFunction) => {
    
    const token = req.header('x-auth') as string
    
    if(!token){
        return res.send('Please Login')
    }

    try {
        const payload = verifyJwt(token)
        //@ts-ignore
        req.user = payload
        next()
    } catch (error) {
        return res.send('Token Invalid')
    }

}