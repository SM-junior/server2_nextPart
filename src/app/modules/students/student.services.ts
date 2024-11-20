import { Student } from './student.model';

const getAllStudentFromDb = async () => {
    const result = await Student.find();
    return result
}

const getSingleStudentFromDb = async (id: string) => {
    const result = await Student.findOne({ id });       //id:203000001
    return result
}

const deleteStudentFromDb = async (id: string) => {
    const result = await Student.updateOne({ id }, { isDeleted: true });
    return result;
}

export const StudentServices = {
    getAllStudentFromDb,
    getSingleStudentFromDb,
    deleteStudentFromDb,
};
