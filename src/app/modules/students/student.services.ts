import mongoose from 'mongoose';
import { User } from '../user/user.model';
import { Student } from './student.model';

const getAllStudentFromDb = async () => {
    const result = await Student.find().populate('admissionSemester').populate({
        path: 'academicDepartment',
        populate: {
            path: "academicFaculty",
            select: "academicFaculty"
        }
    });
    return result
}

const getSingleStudentFromDb = async (id: string) => {
    const result = await Student.findOne({ id });       //id:203000001
    return result
}

const deleteStudentFromDb = async (id: string) => {

    const session = await mongoose.startSession();

    try {
        session.startTransaction();

        const deletedStudent = await Student.findOneAndUpdate({ id }, { isDeleted: true }, { new: true, session });

        if (!deletedStudent) {
            throw new Error('Fail to delete student')
        }

        const deletedUser = await User.findOneAndUpdate({ id }, { isDeleted: true }, { new: true, session })

        if (!deletedUser) {
            throw new Error('Fail to delete user')
        }

        await session.commitTransaction();
        await session.endSession();

        return deletedStudent;

    } catch (error) {
        session.abortTransaction();
        session.endSession()
        throw error
    }
}

export const StudentServices = {
    getAllStudentFromDb,
    getSingleStudentFromDb,
    deleteStudentFromDb,
};
