import { academicDepartmentServices } from "./academicDepartment.service";
import { StatusCodes } from 'http-status-codes';
import { catchAsync } from "../../utils/catchAsync";

const createAcademicDepartment = catchAsync(async (req, res) => {
    const payload = req.body;
    const result = await academicDepartmentServices.createAcademicDepartmentIntoDb(payload);
    res.status(StatusCodes.OK).json({
        success: true,
        message: "AcademicDepartment is created successfully",
        data: result
    })
})

const getSingleAcademicDepartment = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await academicDepartmentServices.getSingleAcademicDepartmentFromDb(id);
    res.status(StatusCodes.OK).json({
        success: true,
        message: "Academic department is retrieve successfully",
        data: result,
    })
})

const getAllAcademicDepartment = catchAsync(async (req, res) => {
    const result = await academicDepartmentServices.getAllAcademicDepartmentFromDb();
    res.status(StatusCodes.OK).json({
        success: true,
        message: "All academic departments are retrieved successfully",
        data: result,
    })
})

const updateAcademicDepartment = catchAsync(async (req, res) => {
    const { id } = req.params;
    const payload = req.body;
    const result = await academicDepartmentServices.updateAcademicDepartmentIntoDb(id, payload);
    res.status(StatusCodes.OK).json({
        success: true,
        message: "Academic department updated successfully",
        data: result,
    })
})

export const academicDepartmentController = {
    createAcademicDepartment,
    getSingleAcademicDepartment,
    getAllAcademicDepartment,
    updateAcademicDepartment
}