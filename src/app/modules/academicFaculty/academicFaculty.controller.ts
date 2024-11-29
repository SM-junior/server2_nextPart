import { academicFacultyServices } from "./academicFaculty.services";
import { StatusCodes } from 'http-status-codes';
import { catchAsync } from "../../utils/catchAsync";

const createAcademicFaculty = catchAsync(async (req, res) => {
    const facultyData = req.body;
    console.log(facultyData);
    const result = await academicFacultyServices.createAcademicFacultyIntoDb(facultyData);
    res.status(StatusCodes.OK).json({
        success: true,
        message: 'Academic Faculty is created successfully',
        data: result,
    })
})

const getSingleAcademicFaculty = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await academicFacultyServices.getSingleAcademicFacultyFromDb(id);
    res.status(StatusCodes.OK).json({
        success: true,
        message: 'Academic Faculty is retrieved successfully',
        data: result,
    })
})

const getAllAcademicFaculty = catchAsync(async (req, res) => {
    const result = await academicFacultyServices.getAllAcademicFacultyFromDb();
    res.status(StatusCodes.OK).json({
        success: true,
        message: 'Al Academic Faculties are retrieved successfully',
        data: result,
    })
})

const updateAcademicFaculty = catchAsync(async (req, res) => {
    const { id } = req.params;
    const faculty = req.body;
    const result = await academicFacultyServices.updateAcademicFacultyIntoDb(id, faculty)
    res.status(StatusCodes.OK).json({
        success: true,
        message: 'Academic Faculty updated successfully',
        data: result,
    })
})

export const academicFacultyController = {
    createAcademicFaculty,
    getSingleAcademicFaculty,
    getAllAcademicFaculty,
    updateAcademicFaculty
}