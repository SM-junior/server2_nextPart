import { z } from 'zod';

const nameSchema = z.object({
    firstName: z.string().trim().min(1, "First name is required"),
    middleName: z.string().trim().optional(),
    lastName: z.string().trim().min(1, "Last name is required"),
});
const genderEnum = z.enum(["Male", "Female", "Others"]);
const bloodGroupEnum = z.enum(["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"]);

export const adminValidationSchema = z.object({
    body: z.object({
        password: z.string().max(20),
        admin: z.object({
            designation: z.string().trim().min(1, "Designation is required"),
            name: nameSchema,
            gender: genderEnum,
            dateOfBirth: z.string().optional(), // Date strings can be validated with `z.date()` if already converted
            email: z.string().email("Invalid email address"),
            contactNo: z.string().trim().min(1, "Contact number is required"),
            emergencyContactNo: z.string().trim().min(1, "Emergency contact number is required"),
            bloodGroup: bloodGroupEnum.optional(),
            presentAddress: z.string().trim().min(1, "Present address is required"),
            permanentAddress: z.string().trim().min(1, "Permanent address is required"),
            profileImg: z.string().url("Invalid profile image URL").optional(),
            isDeleted: z.boolean().default(false),
        })
    })
});

// Zod schema for validating update operations (partial fields allowed)
export const adminValidations = {
    adminValidationSchema
}
