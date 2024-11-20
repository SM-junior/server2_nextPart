import { NextFunction, Request, Response } from "express";
import { StatusCodes } from 'http-status-codes';


//global error handler--->app.ts theke sobar sese call dite hobe
export const globalErrorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    const statusCode = 500;
    const message = err.message || "Something went wrong";
    return res.status(statusCode).json({
        success: false,
        message,
        error: err
    })
}

//http status code--->app.ts theke sobar sese call dite hobe
export const notFound = ((req: Request, res: Response, next: NextFunction) => {
    return res.status(StatusCodes.NOT_FOUND).json({
        success: false,
        message: 'Route not found',
        error: ''
    })
})