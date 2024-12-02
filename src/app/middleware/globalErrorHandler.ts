import { ErrorRequestHandler, NextFunction, Request, Response } from "express";
import { StatusCodes } from 'http-status-codes';
import { ZodError, ZodIssue } from "zod";
import config from "../config";
import { handleCastError } from "../error/handleCastError";
import { handleDuplicateError } from "../error/handleDuplicateError";
import { handleValidationError } from "../error/handleValidationError";
import handleZodError from "../error/handleZodError";
import { TErrorSources, TGenericErrorResponse } from "../interface/error";


//global error handler--->app.ts theke sobar sese call dite hobe
// catch only express error, not others error
export const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {

    let statusCode = 500;
    let message = err.message || "Something went wrong";

    let errorSources: TErrorSources = [{
        path: '',
        message: 'Something went wrong!'
    }]


    if (err instanceof ZodError) {
        const simplifiedError = handleZodError(err);

        statusCode = simplifiedError?.statusCode;
        message = simplifiedError?.message;
        errorSources = simplifiedError?.errorSources;
    } else if (err?.name === 'ValidationError') {
        const simplifiedError = handleValidationError(err);
        statusCode = simplifiedError?.statusCode;
        message = simplifiedError?.message;
        errorSources = simplifiedError?.errorSources;
    } else if (err?.name === 'CastError') {
        const simplifiedError = handleCastError(err);
        statusCode = simplifiedError?.statusCode;
        message = simplifiedError?.message;
        errorSources = simplifiedError?.errorSources;
    } else if (err.errorResponse.code === 11000) {
        const simplifiedError = handleDuplicateError(err);
        statusCode = simplifiedError?.statusCode;
        message = simplifiedError?.message;
        errorSources = simplifiedError?.errorSources;
    }


    return res.status(statusCode).json({
        success: false,
        message,
        errorSources,
        stack: config.NODE_ENV === 'development' ? err?.stack : null,
        err
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