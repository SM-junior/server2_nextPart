
import { z } from "zod";
import { AcademicSemesterCode, AcademicSemesterName, months } from "./academicSemester.const";


export const academicSemesterValidationSchema = z.object({
    body: z.object({
        name: z.enum([...AcademicSemesterName] as [string, ...string[]]),
        code: z.enum([...AcademicSemesterCode] as [string, ...string[]]),
        year: z.string(),
        startMonth: z.enum([...months] as [string, ...string[]]),
        endMonth: z.enum([...months] as [string, ...string[]])
    })
});

export const academicSemesterValidation = {
    academicSemesterValidationSchema
}