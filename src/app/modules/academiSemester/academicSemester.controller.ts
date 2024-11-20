
import { StatusCodes } from 'http-status-codes';
import { catchAsync } from '../../utils/catchAsync';
import { createAcademicSemesterServices } from './academicSemester.services';


const createAcademicSemester = catchAsync(async (req, res) => {
    const result = await createAcademicSemesterServices.createAcademicSemesterIntoDb(req.body)
    res.status(StatusCodes.OK).json({
        success: true,
        message: "AcademicSemester is created successful",
        data: result,
    })
})

export const academicSemesterController = {
    createAcademicSemester
}