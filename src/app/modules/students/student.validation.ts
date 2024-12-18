import { z } from 'zod';

// Define the Zod schema for UserName
const userNameValidationSchema = z.object({
    firstName: z.string().min(1, { message: 'First Name is required' }).trim(),
    lastName: z.string().min(1, { message: 'Last Name is required' }).trim(),
    middleName: z.string().optional().transform((val) => val?.trim() || '')
});

// Define the Zod schema for Guardian
const guardianValidationSchema = z.object({
    fatherName: z.string().min(1, { message: 'Father Name is required' }).trim(),
    fatherOccupation: z.string().min(1, { message: 'Father Occupation is required' }).trim(),
    fatherContactNo: z.string().min(1, { message: 'Father Contact No is required' }).trim(),
    motherName: z.string().min(1, { message: 'Mother Name is required' }).trim(),
    motherOccupation: z.string().min(1, { message: 'Mother Occupation is required' }).trim(),
    motherContactNo: z.string().min(1, { message: 'Mother Contact No is required' }).trim(),
});

// Define the Zod schema for LocalGuardian
const localGuardianValidationSchema = z.object({
    name: z.string().min(1, { message: 'Local Guardian Name is required' }).trim(),
    occupation: z.string().min(1, { message: 'Local Guardian Occupation is required' }).trim(),
    contact: z.string().min(1, { message: 'Local Guardian Contact is required' }).trim(),
    address: z.string().min(1, { message: 'Local Guardian Address is required' }).trim(),
});

// Define the main Zod schema for Student
const studentValidationSchema = z.object({
    body: z.object({
        password: z.string().max(20),
        student: z.object({
            name: userNameValidationSchema,
            gender: z.enum(['male', 'female', 'other'], { message: '{VALUE} is not supported' }),
            dateOfBirth: z.string().optional(),
            email: z.string().email({ message: 'Invalid email format' }).trim(),
            contactNo: z.string().min(1, { message: 'Contact No is required' }).trim(),
            emergencyContactNo: z.string().min(1, { message: 'Emergency Contact No is required' }).trim(),
            bloodGroup: z.enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']),
            presentAddress: z.string().min(1, { message: 'Present Address is required' }),
            permanentAddress: z.string().min(1, { message: 'Permanent Address is required' }),
            guardian: guardianValidationSchema,
            localGuardian: localGuardianValidationSchema.optional(),
            admissionSemester: z.string(),
            academicDepartment: z.string(),
            profileImage: z.string().optional(),
        })
    })
});

const updateUserNameValidationSchema = z.object({
    firstName: z.string().min(1).max(20).optional(),
    middleName: z.string().optional(),
    lastName: z.string().optional(),
});

const updateGuardianValidationSchema = z.object({
    fatherName: z.string().optional(),
    fatherOccupation: z.string().optional(),
    fatherContactNo: z.string().optional(),
    motherName: z.string().optional(),
    motherOccupation: z.string().optional(),
    motherContactNo: z.string().optional(),
});

const updateLocalGuardianValidationSchema = z.object({
    name: z.string().optional(),
    occupation: z.string().optional(),
    contactNo: z.string().optional(),
    address: z.string().optional(),
});

export const updateStudentValidationSchema = z.object({
    body: z.object({
        student: z.object({
            name: updateUserNameValidationSchema,
            gender: z.enum(['male', 'female', 'other']).optional(),
            dateOfBirth: z.string().optional(),
            email: z.string().email().optional(),
            contactNo: z.string().optional(),
            emergencyContactNo: z.string().optional(),
            bloodGroup: z
                .enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'])
                .optional(),
            presentAddress: z.string().optional(),
            permanentAddress: z.string().optional(),
            guardian: updateGuardianValidationSchema.optional(),
            localGuardian: updateLocalGuardianValidationSchema.optional(),
            admissionSemester: z.string().optional(),
            profileImg: z.string().optional(),
            academicDepartment: z.string().optional(),
        }),
    }),
});


export const studentValidation = {
    studentValidationSchema,
    updateStudentValidationSchema
};
