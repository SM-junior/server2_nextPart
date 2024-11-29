import { z } from "zod";

const academicDepartmentValidationSchema = z.object({
    body: z.object({
        name: z
            .string({
                required_error: "The department name is required.",
                invalid_type_error: "The department name must be a string.",
            }),
        academicFaculty: z
            .string({
                required_error: "The academic faculty ID is required.",
                invalid_type_error: "The academic faculty ID must be a valid ObjectId string.",
            })
    })
});
const academicDepartmentUpdateSchema = z.object({
    body: z.object({
        name: z
            .string({
                required_error: "The department name is required.",
                invalid_type_error: "The department name must be a string.",
            }).optional(),
        academicFaculty: z
            .string({
                required_error: "The academic faculty ID is required.",
                invalid_type_error: "The academic faculty ID must be a valid ObjectId string.",
            }).optional()
    })
});

export const academicDepartmentValidation = {
    academicDepartmentValidationSchema,
    academicDepartmentUpdateSchema
}