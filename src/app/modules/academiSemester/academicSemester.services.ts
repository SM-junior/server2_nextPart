import { TAcademicSemester } from "./academicSemester.interface";
import { AcademicSemester } from "./academicSemester.model"

const createAcademicSemesterIntoDb = async (payload: TAcademicSemester) => {

    // type TAcademicSemesterCodeMapper = {
    //     Autumn: '01',
    //     Summer: '02',
    //     Fall: '03'
    // }

    // const academicSemesterCodeMapper: TAcademicSemesterCodeMapper = {
    //     Autumn: '01',
    //     Summer: '02',
    //     Fall: '03'
    // }
    // if (academicSemesterCodeMapper[payload.name] !== payload.code) {
    //     throw new Error('Invalid semester code')
    // }

    const result = await AcademicSemester.create(payload);
    return result;
}

export const createAcademicSemesterServices = {
    createAcademicSemesterIntoDb
}