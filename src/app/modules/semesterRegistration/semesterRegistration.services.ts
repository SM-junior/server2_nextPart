import { TSemesterRegistration } from "./semesterRegistration.interface"
import { AcademicSemester } from '../academicSemester/academicSemester.model';
import { SemesterRegistration } from "./semesterRegistration.model";
import QueryBuilder from "../../builder/QueryBuilder";
import { RegistrationStatus } from "./semesterRegistration.const";

const createSemesterRegistrationIntoDb = async (payload: TSemesterRegistration) => {
    const academicSemester = payload?.academicSemester;

    //check if there is any "UPCOMING" or "ONGOING" registered semester

    const existingSemester = await SemesterRegistration.findOne({
        status: { $in: ["UPCOMING", "ONGOING"] },
    });

    if (existingSemester) {
        throw new Error(
            `A semester with status "${existingSemester.status}" already exists.`
        );
    }

    // const isThereAnyUpcomingOrOngoingSEmester =
    //     await SemesterRegistration.findOne({
    //         $or: [
    //             { status: RegistrationStatus.UPCOMING },
    //             { status: RegistrationStatus.ONGOING },
    //         ],
    //     });

    // if (isThereAnyUpcomingOrOngoingSEmester) {
    //     throw new Error(
    //         `There is already an ${isThereAnyUpcomingOrOngoingSEmester.status} registered semester !`,
    //     );
    // }



    //check if the semester is exist
    const isAcademicSemesterExist = await AcademicSemester.findById(academicSemester);
    if (!isAcademicSemesterExist) {
        throw new Error('This academic semester is not found !')
    }

    //check if the semesterRegistration is already exist
    const isSemesterRegistrationExist = await SemesterRegistration.findOne({ academicSemester })
    if (isSemesterRegistrationExist) {
        throw new Error('This semester registration is already exists !')
    }

    const result = await SemesterRegistration.create(payload);
    return result;
}

const getAllSemesterRegistrationFromDb = async (query: Record<string, unknown>) => {
    const semesterRegistrationQuery = new QueryBuilder(SemesterRegistration.find()
        .populate('academicSemester'), query)
        .filter()  //ekhane search ar need nei. filter diyei kora jabe
        .paginate()
        .fields();

    const result = await semesterRegistrationQuery.modelQuery;
    return result;
}

const getSingleSemesterRegistrationFrom = async (id: string) => {
    const result = await SemesterRegistration.findById(id).populate('academicSemester');
    return result;
}

const updateSemesterRegistrationIntoDb = async (id: string, payload: Partial<TSemesterRegistration>) => {

}


export const semesterRegistrationServices = {
    createSemesterRegistrationIntoDb,
    getAllSemesterRegistrationFromDb,
    getSingleSemesterRegistrationFrom,
    updateSemesterRegistrationIntoDb,
}