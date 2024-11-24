import { StudentServices } from './student.services';
import { catchAsync } from '../../utils/catchAsync';
import { StatusCodes } from 'http-status-codes';

const getAllStudent = catchAsync(async (req, res) => {
    const result = await StudentServices.getAllStudentFromDb();
    res.status(StatusCodes.OK).json({
        success: true,
        message: 'Students are retrieved successfully',
        data: result,
    });
})

const getSingleStudent = catchAsync(async (req, res) => {
    const { studentId } = req.params;
    const result = await StudentServices.getSingleStudentFromDb(studentId);
    res.status(StatusCodes.OK).json({
        success: true,
        message: 'Student is retrieved successfully',
        data: result,
    });
})

const deleteStudent = catchAsync(async (req, res) => {
    const { studentId } = req.params;
    const result = await StudentServices.deleteStudentFromDb(studentId);
    res.status(StatusCodes.OK).json({
        success: true,
        message: 'Student is deleted successfully',
        data: ''
    })
})

export const StudentController = {
    getAllStudent,
    getSingleStudent,
    deleteStudent,
};
