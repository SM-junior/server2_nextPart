import { Schema, model } from "mongoose";
import { TAcademicSemester } from "./academicSemester.interface";
import { AcademicSemesterCode, academicSemesterCodeMapper, AcademicSemesterName, months } from "./academicSemester.const";


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

// check if the name and year is already exist
AcademicSemesterSchema.pre('save', async function (next) {
    const academicSemester = this;  //-->this means AcademicSemesterSchema, jeta req.body te jabe

    const existingSemester = await AcademicSemester.findOne({
        name: this.name,
        year: this.year,
    })

    if (existingSemester) {
        throw new Error('Academic semester is already exists')
    }
    next()
})

//check if the name and code is not matched, (aita services ao kora ace. same result)
AcademicSemesterSchema.pre('save', async function (next) {
    const academicSemester = this;  //-->this means AcademicSemesterSchema, jeta req.body te jabe

    if (academicSemesterCodeMapper[this.name] !== this.code) {
        throw new Error('Invalid semester code')
    }
    next()
})

// Create and export the model
export const AcademicSemester = model<TAcademicSemester>('AcademicSemester', AcademicSemesterSchema);
