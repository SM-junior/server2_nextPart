import mongoose from "mongoose";
import QueryBuilder from "../../builder/QueryBuilder";
import { User } from "../user/user.model";
import { searchableFields } from "./faculty.const";
import { Faculty } from "./faculty.model";

const getAllFacultyFromDb = async (query: Record<string, unknown>) => {

    const FacultyQuery = new QueryBuilder(
        Faculty.find()
            .populate({
                path: 'academicDepartment',
                populate: {
                    path: "academicFaculty",
                }
            }),
        query
    )
        .search(searchableFields)
        .filter()
        .sort()
        .paginate()
        .fields();

    const result = await FacultyQuery.modelQuery;
    return result;
}

const getSingleFacultyFromDb = async (id: string) => {
    const result = await Faculty.findById(id);
    return result;
}

const deleteFacultyFromDb = async (id: string) => {
    const session = await mongoose.startSession();

    try {
        session.startTransaction();

        const deletedFaculty = await Faculty.findByIdAndUpdate(
            id,
            { isDeleted: true },
            { new: true, session },
        );

        if (!deletedFaculty) {
            throw new Error('Failed to delete faculty');
        }

        // get user _id from deletedFaculty
        const userId = deletedFaculty.user;

        const deletedUser = await User.findByIdAndUpdate(
            userId,
            { isDeleted: true },
            { new: true, session },
        );

        if (!deletedUser) {
            throw new Error('Failed to delete user');
        }

        await session.commitTransaction();
        await session.endSession();

        return deletedFaculty;
    } catch (err: any) {
        await session.abortTransaction();
        await session.endSession();
        throw new Error(err);
    }
}

export const facultyServices = {
    getAllFacultyFromDb,
    getSingleFacultyFromDb,
    deleteFacultyFromDb,

}