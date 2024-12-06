import { StatusCodes } from "http-status-codes";
import { catchAsync } from "../../utils/catchAsync";
import { facultyServices } from "./faculty.service";

const getAllFaculty = catchAsync(async (req, res) => {
    const result = await facultyServices.getAllFacultyFromDb();
    res.status(StatusCodes.OK).json({
        success: true,
        message: 'All Faculties are retrieved successfully',
        data: result,
    });
})

const getSingleFaculty = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await facultyServices.getSingleFacultyFromDb(id);
    res.status(StatusCodes.OK).json({
        success: true,
        message: 'Faculty retrieved successfully',
        data: result,
    });
})

const deleteFaculty = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await facultyServices.deleteFacultyFromDb(id);
    res.status(StatusCodes.OK).json({
        success: true,
        message: 'Faculty is deleted successfully',
        data: result,
    });
});

export const facultyController = {
    getAllFaculty,
    getSingleFaculty,
    deleteFaculty
}