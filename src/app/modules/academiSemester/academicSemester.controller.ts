
import { StatusCodes } from 'http-status-codes';
import { catchAsync } from '../../utils/catchAsync';
import { AcademicSemester } from './academicSemester.model';
import { createAcademicSemesterServices } from './academicSemester.services';


const createAcademicSemester = catchAsync(async (req, res) => {

    //check existing name and year, eta pre hook diye academicSemester.model.ts ar kora ace. same result
    // const { name, year } = req.body;
    // const existingSemester = await AcademicSemester.findOne({ name, year })
    // if (existingSemester) {
    //     throw new Error("semester already exist")
    // }

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