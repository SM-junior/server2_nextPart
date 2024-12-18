import mongoose from "mongoose";
import config from "../../config";
import { AcademicDepartment } from "../academicDepartment/academicDepartment.model";
import { AcademicSemester } from "../academicSemester/academicSemester.model";
import { TFaculty } from "../faculty/faculty.interface";
import { TAdmin } from "../admin/admin.interface";
import { Faculty } from "../faculty/faculty.model";
import { TStudent } from "../students/student.interface";
import { Student } from "../students/student.model";
import { TUser } from "./user.interface";
import { User } from "./user.model";
import { generatedAdminId, generatedFacultyId, generatedStudentId } from "./user.utils";
import { Admin } from "../admin/admin.model";

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
        throw new Error('Fail to create Student')
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


const createFacultyIntoDb = async (password: string, payload: TFaculty) => {
    const userData: Partial<TUser> = {};
    userData.password = password || config.default_password as string;
    userData.role = 'faculty';

    const academicDepartment = await AcademicDepartment.findById(payload.academicDepartment);
    if (!academicDepartment) {
        throw new Error('Academic department is not found')
    }

    const session = await mongoose.startSession();

    try {
        session.startTransaction();

        userData.id = await generatedFacultyId();

        const newUser = await User.create([userData], { session });
        if (!newUser.length) {
            throw new Error("Fail to create user")
        }
        payload.id = newUser[0].id;
        payload.user = newUser[0]._id;

        const newFaculty = await Faculty.create([payload], { session });
        if (!newFaculty.length) {
            throw new Error("Fail to create Faculty")
        }

        await session.commitTransaction();
        await session.endSession();

        return newFaculty;
    } catch (error: any) {
        await session.abortTransaction();
        await session.endSession();
        throw new Error(error);
    }
}

const createAdminIntoDb = async (password: string, payload: TAdmin) => {
    const userData: Partial<TUser> = {};
    userData.password = password || config.default_password as string;
    userData.role = 'admin';

    const session = await mongoose.startSession();

    try {
        session.startTransaction();

        userData.id = await generatedAdminId();

        const newUser = await User.create([userData], { session });
        if (!newUser.length) {
            throw new Error("Fail to create newUser")
        }

        payload.id = newUser[0].id;
        payload.user = newUser[0]._id;

        const newAdmin = await Admin.create([payload], { session });
        if (!newAdmin.length) {
            throw new Error("Fail to create Admin")
        }

        await session.commitTransaction();
        await session.endSession();

        return newAdmin;

    } catch (error: any) {
        await session.abortTransaction();
        await session.endSession();
        throw new Error(error);
    }

}

export const userServices = {
    createStudentToDb,
    createFacultyIntoDb,
    createAdminIntoDb
}