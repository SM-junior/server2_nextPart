import mongoose from "mongoose";
import config from "../../config";
import { AcademicSemester } from "../academicSemester/academicSemester.model";
import { TStudent } from "../students/student.interface";
import { Student } from "../students/student.model";
import { TUser } from "./user.interface";
import { User } from "./user.model";
import { generatedStudentId } from "./user.utils";

const createStudentToDb = async (password: string, payload: TStudent) => {
    //create user
    const userData: Partial<TUser> = {};

    userData.password = password || config.default_password as string;
    userData.role = 'student';

    const admissionSemester = await AcademicSemester.findById(payload.admissionSemester)

    const session = await mongoose.startSession();

    try {
        session.startTransaction();

        userData.id = await generatedStudentId(admissionSemester);
        const newUser = await User.create([userData], { session });

        if (!newUser.length) {
            throw new Error('Fail to create user')

        }
        payload.id = newUser[0].id;
        payload.user = newUser[0]._id

        const newStudent = await Student.create([payload], { session })
        if (!newStudent.length) {
            throw new Error('Fail to create Student')
        }
        await session.commitTransaction();
        await session.endSession();

        return newStudent

    } catch (error) {
        await session.abortTransaction();
        await session.endSession();
        throw error
    }



    // const userData: Partial<TUser> = {};
    // userData.role = 'student';
    // userData.password = password || config.default_password as string;
    // const generatedStudentId = async () => {
    //     const lastStudent = await User.findOne(
    //         {
    //             role: "student"
    //         }, { id: 1, _id: 0 }
    //     ).sort({ createdAt: -1 }).lean();

    //     const lastStudentId = lastStudent?.id ? lastStudent.id.substring(6) : undefined; //'2030010001'.substring(6)-->'0001'
    //     const currentId = lastStudentId || (0).toString(); //const currentId = '0001' || (0).toString();means-->'0001'||'0'
    //     let incrementId = (Number(currentId) + 1).toString().padStart(4, '0');  //(Number('0001' OR '0'))+1--> (1 OR 0)+1-->1+1 OR 0+1-->2 OR 1
    //     //(2 OR 1).toString()-->'2' OR '1'
    //     //'2'.padstart(4,'0')-->'0002'
    //     const admissionSemester = await AcademicSemester.findById(payload.admissionSemester)
    //     incrementId = `${admissionSemester?.year}${admissionSemester?.code}${incrementId}`
    //     return incrementId
    // }

    // userData.id = await generatedStudentId();

    // const newUser = await User.create(userData);

    // if (Object.keys(newUser).length) {
    //     payload.id = newUser.id;
    //     payload.user = newUser._id

    //     const newStudent = await Student.create(payload)
    //     return newStudent
    // }
};


export const userServices = {
    createStudentToDb
}