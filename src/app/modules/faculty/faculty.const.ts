import { TBloodGroup, TGender } from "./faculty.interface";

export const Gender: TGender[] = ['Male', 'Female', 'Others'];

export const BloodGroup: TBloodGroup[] = [
    'A+',
    'A-',
    'B+',
    'B-',
    'AB+',
    'AB-',
    'O+',
    'O-',
];

export const searchableFields = [
    'email',
    'id',
    'contactNo',
    'emergencyContactNo',
    'name.firstName',
    'name.lastName',
    'name.middleName',
]