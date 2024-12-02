import mongoose from "mongoose";
import { TGenericErrorResponse } from "../interface/error";

export const handleCastError = (err: mongoose.Error.CastError): TGenericErrorResponse => {
    const statusCode = 400;
    const message = 'Invalid ID';
    const errorSources = [
        {
            path: err?.path,
            message: err?.message
        }
    ]

    return {
        statusCode,
        message,
        errorSources
    }
}