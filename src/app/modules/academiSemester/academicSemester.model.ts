import { Schema, model } from "mongoose";
import { TAcademicSemester } from "./academicSemester.interface";
import { AcademicSemesterCode, AcademicSemesterName, months } from "./acedemicSemester.const";


// Define the Mongoose Schema
export const AcademicSemesterSchema = new Schema(
    {
        name: {
            type: String,
            enum: AcademicSemesterName, // Allowed values for the name
            required: true,
        },
        code: {
            type: String,
            enum: AcademicSemesterCode, // Allowed values for the code
            required: true,
        },
        year: {
            type: String, // Year stored as a Date
            required: true,
        },
        startMonth: {
            type: String,
            enum: months,
            required: true,
        },
        endMonth: {
            type: String,
            enum: months,
            required: true,
        },
    },
    {
        timestamps: true, // Automatically adds createdAt and updatedAt fields
    }
);

// Create and export the model
export const AcademicSemester = model<TAcademicSemester>('AcademicSemester', AcademicSemesterSchema);
