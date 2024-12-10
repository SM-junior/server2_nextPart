import mongoose from "mongoose";
import QueryBuilder from "../../builder/QueryBuilder";
import { User } from "../user/user.model";
import { searchableFields } from "./admin.const";
import { Admin } from "./admin.model";

const getAllAdminFromDb = async (query: Record<string, unknown>) => {

    const AdminQuery = new QueryBuilder(
        Admin.find(), query
    )
        .search(searchableFields)
        .filter()
        .sort()
        .paginate()
        .fields();

    const result = await AdminQuery.modelQuery;
    return result;
}

const getSingleAdminFromDb = async (id: string) => {
    const result = await Admin.findById(id);
    return result;
}

const deleteAdminFromDb = async (id: string) => {
    const session = await mongoose.startSession();
    try {
        session.startTransaction();

        const deletedAdmin = await Admin.findByIdAndUpdate(id, { isDeleted: true }, { new: true, session });
        if (!deletedAdmin) {
            throw new Error('Fail to delete Admin')
        }

        //find user_id from deletedAdmin
        const userId = deletedAdmin.user;

        const deletedUser = await User.findByIdAndUpdate(userId, { isDeleted: true }, { new: true, session });
        if (!deletedUser) {
            throw new Error('Fail to delete User')
        }
        session.commitTransaction()
        session.endSession()
        return deletedAdmin;

    } catch (error: any) {
        session.abortTransaction();
        session.endSession();
        throw new Error(error)
    }

}

export const adminServices = {
    getAllAdminFromDb,
    getSingleAdminFromDb,
    deleteAdminFromDb,

}