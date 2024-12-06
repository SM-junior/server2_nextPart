import mongoose from 'mongoose';
import QueryBuilder from '../../builder/QueryBuilder';
import { User } from '../user/user.model';
import { searchableFields } from './student.const';
import { TStudent } from './student.interface';
import { Student } from './student.model';

const getAllStudentFromDb = async (query: Record<string, unknown>) => {

    //...........raw searching, filtering, pagination, sorting, fields limiting...........
    //here query={searchTerm:'mubarak}
    // console.log('base query', query);

    // const queryObj = { ...query }

    // let searchTerm = '';

    // if (query?.searchTerm) {
    //     searchTerm = query?.searchTerm as string;
    //     console.log(searchTerm);
    // }

    // const searchQuery = Student.find({
    //     $or: searchFields.map(field => ({
    //         [field]: { $regex: searchTerm, $options: 'i' }
    //     }))
    // })

    // const excludedField = ['searchTerm', 'sort', 'limit', 'page', 'fields'];
    // excludedField.forEach(el => delete queryObj[el]);


    // const filterQuery = searchQuery
    //     .find(queryObj)
    //     .populate('admissionSemester')
    //     .populate({
    //         path: 'academicDepartment',
    //         populate: {
    //             path: "academicFaculty",
    //             select: "academicFaculty"
    //         }
    //     });

    // let sort = '-createdAt'

    // if (query.sort) {
    //     sort = query.sort as string;
    // }

    // const sortQuery = filterQuery.sort(sort)

    // let page = 1;
    // let skip = 0
    // let limit = 0;

    // if (query.limit) {
    //     limit = Number(query.limit);
    // }

    // if (query.page) {
    //     page = Number(query.page);
    //     skip = Number((page - 1) * limit)
    // }
    // const paginateQuery = sortQuery.skip(skip)

    // const limitQuery = paginateQuery.limit(limit)

    // let fields = '';
    // if (query.fields) {
    //     fields = (query.fields as string).split(',').join(' ')
    // }

    // const fieldsQuery = await limitQuery.select(fields)

    // return fieldsQuery;


    //.......searching, filtering, pagination, sorting, fields limiting with query builder...........
    const studentQuery = new QueryBuilder(
        Student.find()
            .populate('admissionSemester')
            .populate({
                path: 'academicDepartment',
                populate: {
                    path: "academicFaculty",
                    select: "academicFaculty"
                }
            }),
        query,
    )
        .search(searchableFields)
        .filter()
        .sort()
        .paginate()
        .fields();
    const result = await studentQuery.modelQuery;

    return result;


}

const getSingleStudentFromDb = async (id: string) => {
    const result = await Student.findOne({ id });       //id:203000001
    return result
}

const updateStudentIntoDb = async (id: string, payload: Partial<TStudent>) => {
    const { name, guardian, localGuardian, ...remainingStudentData } = payload;

    const modifiedUpdatedData: Record<string, unknown> = {
        ...remainingStudentData,
    };
    if (name && Object.keys(name).length) {
        for (const [key, value] of Object.entries(name)) {
            modifiedUpdatedData[`name.${key}`] = value;
        }
    }

    if (guardian && Object.keys(guardian).length) {
        for (const [key, value] of Object.entries(guardian)) {
            modifiedUpdatedData[`guardian.${key}`] = value;
        }
    }

    if (localGuardian && Object.keys(localGuardian).length) {
        for (const [key, value] of Object.entries(localGuardian)) {
            modifiedUpdatedData[`localGuardian.${key}`] = value;
        }
    }

    const result = await Student.findOneAndUpdate({ id }, modifiedUpdatedData, {
        new: true,
        runValidators: true,
    });
    return result;
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
        throw new Error('Fail to create Student')
    }
}

export const StudentServices = {
    getAllStudentFromDb,
    getSingleStudentFromDb,
    deleteStudentFromDb,
    updateStudentIntoDb
};
