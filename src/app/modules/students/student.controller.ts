import { StudentServices } from './student.services';
import { catchAsync } from '../../utils/catchAsync';
import { StatusCodes } from 'http-status-codes';

const getAllStudent = catchAsync(async (req, res) => {
    const result = await StudentServices.getAllStudentFromDb(req.query);
    res.status(StatusCodes.OK).json({
        success: true,
        message: 'Students are retrieved successfully',
        data: result,
    });
})

const getSingleStudent = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await StudentServices.getSingleStudentFromDb(id);
    res.status(StatusCodes.OK).json({
        success: true,
        message: 'Student is retrieved successfully',
        data: result,
    });
})

const updateStudent = catchAsync(async (req, res) => {
    const { id } = req.params;
    const { student } = req.body;
    console.log(id, student);
    const result = await StudentServices.updateStudentIntoDb(id, student);
    res.status(StatusCodes.OK).json({
        success: true,
        message: 'Student is updated successfully',
        data: result,
    });
})


const deleteStudent = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await StudentServices.deleteStudentFromDb(id);
    res.status(StatusCodes.OK).json({
        success: true,
        message: 'Student is deleted successfully',
        data: result
    })
})

export const StudentController = {
    getAllStudent,
    getSingleStudent,
    deleteStudent,
    updateStudent
};
