import { NextFunction, Request, RequestHandler, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { userServices } from "./user.services";
import { StatusCodes } from 'http-status-codes';

const createStudent = catchAsync(async (req, res, next) => {
    const { password, student: studentData } = req.body;
    //zod validation
    // const zodValidationData = studentValidationSchema.parse(studentData);

    const result = await userServices.createStudentToDb(password, studentData);
    res.status(StatusCodes.OK).json({
        success: true,
        message: 'Student is created successfully',
        data: result,
    });
})

const createFaculty = catchAsync(async (req, res, next) => {
    const { password, faculty: facultyData } = req.body;
    //zod validation
    // const zodValidationData = studentValidationSchema.parse(studentData);

    const result = await userServices.createFacultyIntoDb(password, facultyData);
    res.status(StatusCodes.OK).json({
        success: true,
        message: 'Faculty is created successfully',
        data: result,
    });
})

export const userController = {
    createStudent,
    createFaculty
}