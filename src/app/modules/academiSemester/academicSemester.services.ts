import { academicSemesterCodeMapper } from "./academicSemester.const";
import { TAcademicSemester } from "./academicSemester.interface";
import { AcademicSemester } from "./academicSemester.model"

const createAcademicSemesterIntoDb = async (payload: TAcademicSemester) => {
    // const academicSemesterCodeMapper = {
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

const getAllAcademicSemesterFromDb = async () => {
    const result = await AcademicSemester.find();
    return result;
}

const getSingleAcademicSemesterFromDb = async (id: string) => {
    const result = await AcademicSemester.findById(id);
    console.log(result);
    return result;
}

const updateAcademicSemester = async (id: string, payload: Partial<TAcademicSemester>) => {
    if (payload.name && payload.code && academicSemesterCodeMapper[payload.name] !== payload.code) {
        throw new Error("Invalid semester code for the given semester name")
    }
    if (payload.name && payload.year) {
        const existingSemester = await AcademicSemester.findOne({
            name: payload.name,
            year: payload.year,
            _id: { $ne: id }, // Exclude the current document from the check
        });

        if (existingSemester) {
            throw new Error(
                `Academic semester with name "${payload.name}" and year "${payload.year}" already exists.`
            );
        }
    }
    const updatedSemester = await AcademicSemester.findByIdAndUpdate(id, payload, {
        new: true, // Return the updated document
    })
    if (!updatedSemester) {
        throw new Error('Academic semester not found')
    }
    return updatedSemester;
}

export const academicSemesterServices = {
    createAcademicSemesterIntoDb,
    getAllAcademicSemesterFromDb,
    updateAcademicSemester,
    getSingleAcademicSemesterFromDb,
}