import { ErrorRequestHandler, NextFunction, Request, Response } from "express";
import { StatusCodes } from 'http-status-codes';
import { ZodError, ZodIssue } from "zod";
import config from "../config";
import { TErrorSources } from "../interface/error";


//global error handler--->app.ts theke sobar sese call dite hobe
export const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {

    let statusCode = 500;
    let message = err.message || "Something went wrong";

    let errorSources: TErrorSources = [{
        path: '',
        message: 'Something went wrong!'
    }]

    const handleZodError = (err: ZodError) => {
        const statusCode = 400;
        const message = 'Validation error'

        const errorSources: TErrorSources = err.issues.map((issue: ZodIssue) => {
            return {
                path: issue?.path[issue.path.length - 1],
                message: issue?.message
            }
        })

        return {
            statusCode,
            message,
            errorSources
        }
    }

    if (err instanceof ZodError) {
        const simplifiedError = handleZodError(err);

        statusCode = simplifiedError?.statusCode;
        message = simplifiedError?.message;
        errorSources = simplifiedError?.errorSources;
    }

    return res.status(statusCode).json({
        success: false,
        message,
        errorSources,
        stack: config.NODE_ENV === 'development' ? err?.stack : null,
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