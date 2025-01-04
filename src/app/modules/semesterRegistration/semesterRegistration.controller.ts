import { StatusCodes } from "http-status-codes";
import { catchAsync } from "../../utils/catchAsync";
import { SemesterRegistration } from "./semesterRegistration.model";
import { semesterRegistrationServices } from "./semesterRegistration.services";

const createSemesterRegistration = catchAsync(async (req, res) => {
    const result = await semesterRegistrationServices.createSemesterRegistrationIntoDb(req.body);
    res.status(StatusCodes.OK).json({
        success: true,
        message: 'Semester registration is created successfully',
        data: result,
    })
})

const getAllSemesterRegistration = catchAsync(async (req, res) => {
    const result = await semesterRegistrationServices.getAllSemesterRegistrationFromDb(req.query);
    res.status(StatusCodes.OK).json({
        success: true,
        message: 'All Semester registrations are retrieved successfully',
        data: result,
    })
})


const getSingleSemesterRegistration = catchAsync(async (req, res) => {
    const { semesterId } = req.params;
    const result = await semesterRegistrationServices.getSingleSemesterRegistrationFrom(semesterId);
    res.status(StatusCodes.OK).json({
        success: true,
        message: 'Semester registration is retrieved successfully',
        data: result,
    })
})

const updateSemesterRegistration = catchAsync(async (req, res) => {
    const { semesterId } = req.params;
    const result = await semesterRegistrationServices.updateSemesterRegistrationIntoDb(semesterId, req.body);
    res.status(StatusCodes.OK).json({
        success: true,
        message: 'Semester registration is retrieved successfully',
        data: result,
    })
})



export const semesterRegistrationController = {
    createSemesterRegistration,
    getAllSemesterRegistration,
    getSingleSemesterRegistration,
    updateSemesterRegistration,
}