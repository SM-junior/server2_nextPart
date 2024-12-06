import { Faculty } from "./faculty.model";

const getAllFacultyFromDb = async () => {
    const result = await Faculty.find();
    return result;
}

const getSingleFacultyFromDb = async (id: string) => {
    const result = await Faculty.findById(id);
    return result;
}

const deleteFacultyFromDb = async (id: string) => {
    const result = await Faculty.findByIdAndDelete(id);
    return result;
}

export const facultyServices = {
    getAllFacultyFromDb,
    getSingleFacultyFromDb,
    deleteFacultyFromDb,

}