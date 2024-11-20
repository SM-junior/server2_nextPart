import config from "../../config";
import { TStudent } from "../students/student.interface";
import { Student } from "../students/student.model";
import { TUser } from "./user.interface";
import { User } from "./user.model";

const createStudentToDb = async (password: string, studentData: TStudent) => {
    //create user
    const userData: Partial<TUser> = {};

    userData.password = password || config.default_password as string;
    userData.role = 'student';
    userData.id = '203000002'
    const newUser = await User.create(userData);

    if (Object.keys(newUser).length) {
        studentData.id = newUser.id;
        studentData.user = newUser._id

        const newStudent = await Student.create(studentData)
        return newStudent
    }
};

export const userServices = {
    createStudentToDb
}