import mongoose from "mongoose";
import { TErrorSources, TGenericErrorResponse } from "../interface/error";

export const handleValidationError = (err: mongoose.Error.ValidationError): TGenericErrorResponse => {
    const statusCode = 400;
    const message = "Validation Error"
    const errorSources: TErrorSources = Object.values(err.errors).map((e: any) => {
        return {
            path: e.path,
            message: e.message
        }
    });
    return {
        statusCode,
        message,
        errorSources
    }
}