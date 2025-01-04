import mongoose from "mongoose";
import QueryBuilder from "../../builder/QueryBuilder";
import { courseSearchableFields } from "./course.const";
import { TCourse, TCourseFaculty } from "./course.interface";
import { Course, CourseFaculty } from "./course.model";
import { catchAsync } from '../../utils/catchAsync';

const createCourseIntoDb = async (payload: TCourse) => {
    const result = await Course.create(payload);
    return result;
}

const getAllCourseFromDb = async (query: Record<string, unknown>) => {
    const courseQuery = new QueryBuilder(Course.find()
        .populate('preRequisiteCourses.course'), query)
        .search(courseSearchableFields)
        .filter()
        .sort()
        .paginate()
        .fields();

    const result = await courseQuery.modelQuery;
    return result;
}

const getSingleCourseFromDb = async (id: string) => {
    const result = await Course.findById(id).populate('preRequisiteCourses.course');
    return result;
}

const updateCourseIntoDb = async (id: string, payload: Partial<TCourse>) => {
    const { preRequisiteCourses, ...courseRemainingData } = payload;
    console.log(preRequisiteCourses, courseRemainingData);


    const session = await mongoose.startSession();
    try {
        session.startTransaction();

        // 1. basic course info update
        const updatedBasicCourseInfo = await Course.findByIdAndUpdate(
            id,
            courseRemainingData,
            {
                new: true,
                runValidators: true,
                session
            }
        )
        if (!updatedBasicCourseInfo) {
            throw new Error("Fail to update course")
        }

        if (preRequisiteCourses && preRequisiteCourses.length > 0) {
            // filter out the deleted fields
            const deletedPreRequisites = preRequisiteCourses
                .filter((el) => el.course && el.isDeleted)
                .map((el) => el.course);

            console.log(deletedPreRequisites);

            const deletedPreRequisiteCourses = await Course.findByIdAndUpdate(
                id,
                {
                    $pull: {
                        preRequisiteCourses: { course: { $in: deletedPreRequisites } },
                    },
                },
                {
                    new: true,
                    runValidators: true,
                    session
                },
            );

            if (!deletedPreRequisiteCourses) {
                throw new Error("Fail to update course")
            }

            // filter out the new course fields
            const newPreRequisites = preRequisiteCourses?.filter(
                (el) => el.course && !el.isDeleted,
            );

            const newPreRequisiteCourses = await Course.findByIdAndUpdate(
                id,
                {
                    $addToSet: { preRequisiteCourses: { $each: newPreRequisites } },
                },
                {
                    new: true,
                    runValidators: true,
                    session
                },
            );

            if (!newPreRequisiteCourses) {
                throw new Error("Fail to update course")
            }
        }

        const result = await Course.findById(id).populate(
            'preRequisiteCourses.course',
        );

        await session.commitTransaction();
        await session.endSession();
        return result;

    } catch (error) {
        await session.abortTransaction();
        await session.endSession();
        throw new Error('Fail to update course')
    }


}

//with the help of chatGpt
// const updateCourseWithPrerequisites = async (
//     id: string,
//     payload: Partial<TCourse>
// ) => {
//     const { preRequisiteCourses, ...courseData } = payload;

//     // 1. Update basic course info
//     const updatedCourseInfo = await Course.findByIdAndUpdate(
//         id,
//         courseData,
//         { new: true, runValidators: true }
//     );

//     if (preRequisiteCourses && preRequisiteCourses.length > 0) {
//         // 2. Handle prerequisites dynamically

//         // 2.1 Filter courses to remove
//         const prerequisitesToRemove = preRequisiteCourses
//             .filter((prerequisite) => prerequisite.isDeleted)
//             .map((prerequisite) => prerequisite.course);

//         if (prerequisitesToRemove.length > 0) {
//             await Course.findByIdAndUpdate(
//                 id,
//                 {
//                     $pull: {
//                         preRequisiteCourses: { course: { $in: prerequisitesToRemove } },
//                     },
//                 },
//                 { new: true }
//             );
//         }

//         // 2.2 Filter courses to add or update
//         const prerequisitesToAddOrUpdate = preRequisiteCourses.filter(
//             (prerequisite) => !prerequisite.isDeleted
//         );

//         if (prerequisitesToAddOrUpdate.length > 0) {
//             await Course.findByIdAndUpdate(
//                 id,
//                 {
//                     $addToSet: {
//                         preRequisiteCourses: {
//                             $each: prerequisitesToAddOrUpdate,
//                         },
//                     },
//                 },
//                 { new: true, runValidators: true }
//             );
//         }
//     }

//     // 3. Return the updated course with populated prerequisites
//     const result = await Course.findById(id).populate(
//         'preRequisiteCourses.course'
//     );

//     return result;
// };




const deleteCourseIntoDb = async (id: string,) => {
    const result = await Course.findByIdAndUpdate(id, { isDeleted: true }, { new: true });
    return result;
}

const assignFacultiesWithCourseIntoDb = async (id: string, payload: Partial<TCourseFaculty>) => {
    const result = await CourseFaculty.findByIdAndUpdate(
        id,
        {
            course: id,
            $addToSet: { faculties: { $each: payload } },
        },
        {
            upsert: true,
            new: true
        }
    )

    return result;
}

const removeFacultiesFromCourseIntoDb = async (id: string, payload: Partial<TCourseFaculty>) => {
    const result = await CourseFaculty.findByIdAndUpdate(
        id,
        {
            $pull: { faculties: { $in: payload } },
        },
        {
            upsert: true,
            new: true
        }
    )

    return result;
}

export const courseServices = {
    createCourseIntoDb,
    getAllCourseFromDb,
    getSingleCourseFromDb,
    deleteCourseIntoDb,
    // updateCourseWithPrerequisites,
    updateCourseIntoDb,
    assignFacultiesWithCourseIntoDb,
    removeFacultiesFromCourseIntoDb
}