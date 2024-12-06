
import { Types } from 'mongoose';
import { TBloodGroup, TGender } from './admin.const';

export type TUserName = {
    firstName: string;
    middleName: string;
    lastName: string;
};

export type TAdmin = {
    id: string;
    user: Types.ObjectId;
    designation: string;
    name: TUserName;
    gender: TGender;
    dateOfBirth?: Date;
    email: string;
    contactNo: string;
    emergencyContactNo: string;
    bloodGroup?: TBloodGroup;
    presentAddress: string;
    permanentAddress: string;
    profileImg?: string;
    isDeleted: boolean;
};


