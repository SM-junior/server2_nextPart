import { Model, Types } from "mongoose";

export type TGuardian = {
    fatherName: string;
    fatherOccupation: string;
    fatherContactNo: string;
    motherName: string;
    motherOccupation: string;
    motherContactNo: string;
};
export type TUserName = {
    firstName: string;
    lastName: string;
    middleName?: string;
};
export type TLocalGuardian = {
    name: string;
    occupation: string;
    contact: string;
    address: string;
};

export type TStudent = {
    id: string;
    user: Types.ObjectId;
    name: TUserName;
    gender: 'male' | 'female' | 'other';
    dateOfBirth?: Date;
    email: string;
    contactNo: string;
    emergencyContactNo: string;
    bloodGroup: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';
    presentAddress: string;
    permanentAddress: string;
    guardian: TGuardian;
    localGuardian?: TLocalGuardian;
    profileImage?: string;
    isDeleted: boolean
};


//...........custom instance method.................................. 
//interface ar moddhe 3 ta jinis lagbe..
//1. interface/type lagbe,(ekhane already 'TStudent' type ace)
//2. methods lagbe,(ekhance 'StudentMethods' ace)
//3. model lagbe,(ekhane 'StudentModel' ace)

// export type StudentMethods = {
//     isUserExists(id: string): Promise<TStudent | null>
// }
// export type StudentModel = Model<TStudent, {}, StudentMethods>;


//.............custom static methods...................................
export interface StudentModel extends Model<TStudent> {
    isUserExists(id: string): Promise<TStudent | null>
}