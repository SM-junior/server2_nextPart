
import { StatusCodes } from 'http-status-codes';
import { catchAsync } from '../../utils/catchAsync';
import { AcademicSemester } from './academicSemester.model';
import { academicSemesterServices } from './academicSemester.services';


const createAcademicSemester = catchAsync(async (req, res) => {

    //check existing name and year, eta pre hook diye academicSemester.model.ts ar kora ace. same result
    // const { name, year } = req.body;
    // const existingSemester = await AcademicSemester.findOne({ name, year })
    // if (existingSemester) {
    //     throw new Error("semester already exist")
    // }

    const result = await academicSemesterServices.createAcademicSemesterIntoDb(req.body)
    res.status(StatusCodes.OK).json({
        success: true,
        message: "AcademicSemester is created successful",
        data: result,
    })
})

const getAllAcademicSemester = catchAsync(async (req, res) => {
    const result = await academicSemesterServices.getAllAcademicSemesterFromDb();
    res.status(StatusCodes.OK).json({
        success: true,
        message: 'All academic semester retrieved successfully',
        data: result,
    })
})

const getSingleAcademicSemester = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await academicSemesterServices.getSingleAcademicSemesterFromDb(id);
    res.status(StatusCodes.OK).json({
        success: true,
        message: "Academic semester retrieved successfully",
        data: result
    })
})

const updateAcademicSemester = catchAsync(async (req, res) => {
    const { id } = req.params;
    const payload = req.body;
    const result = await academicSemesterServices.updateAcademicSemester(id, payload)
    console.log(result);
    res.status(StatusCodes.OK).json({
        success: true,
        message: "Semester updated successfully",
        data: result,
    })
})

export const academicSemesterController = {
    createAcademicSemester,
    getAllAcademicSemester,
    updateAcademicSemester,
    getSingleAcademicSemester,
}