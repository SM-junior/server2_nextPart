import mongoose from "mongoose";
import { TErrorSources, TGenericErrorResponse } from "../interface/error";

export const handleDuplicateError = (err: any): TGenericErrorResponse => {
    const statusCode = 400;
    const message = "Duplicate key error";

    const match = err.message.match(/"([^"]*)"/);
    const extractedMessage = match && match[1];

    const errorSources: TErrorSources = [
        {
            path: '',
            message: `${extractedMessage} is already exists`
        }
    ]

    return {
        statusCode,
        message,
        errorSources
    }
}