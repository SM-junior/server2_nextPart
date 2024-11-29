import { TAcademicDepartment } from "./academicDepartment.interface";
import { AcademicDepartment } from "./academicDepartment.model";

const createAcademicDepartmentIntoDb = async (payload: TAcademicDepartment) => {
    const result = await AcademicDepartment.create(payload);
    return result;
}

const getSingleAcademicDepartmentFromDb = async (id: string) => {
    const result = await AcademicDepartment.findById(id);
    return result;
}

const getAllStudentsFromDb = async () => {
    const result = await AcademicDepartment.find();
    return result;
}

const updateAcademicDepartmentIntoDb = async (id: string, payload: Partial<TAcademicDepartment>) => {
    const result = await AcademicDepartment.findByIdAndUpdate(id, payload, { new: true });
    if (!id || !payload) {
        throw new Error('Error updating academic department')
    }
    return result
}

export const academicDepartmentServices = {
    createAcademicDepartmentIntoDb,
    getSingleAcademicDepartmentFromDb,
    getAllStudentsFromDb,
    updateAcademicDepartmentIntoDb
}