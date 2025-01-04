import { StatusCodes } from "http-status-codes";
import { catchAsync } from "../../utils/catchAsync";
import { courseServices } from "./course.services";

const createCourse = catchAsync(async (req, res) => {
    // const { course } = req.body
    const result = await courseServices.createCourseIntoDb(req.body);
    res.status(StatusCodes.OK).json({
        success: true,
        message: 'Course is created successfully',
        data: result,
    });
})

const getSingleCourse = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await courseServices.getSingleCourseFromDb(id);
    res.status(StatusCodes.OK).json({
        success: true,
        message: 'Course is retrieved successfully',
        data: result,
    });
})

const getAllCourse = catchAsync(async (req, res) => {
    const result = await courseServices.getAllCourseFromDb(req.query);
    res.status(StatusCodes.OK).json({
        success: true,
        message: 'All Courses are  retrieved successfully',
        data: result,
    });
})

const updateCourse = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await courseServices.updateCourseIntoDb(id, req.body);
    //with the help of chatGpt
    // const result = await courseServices.updateCourseWithPrerequisites(id, req.body);
    res.status(StatusCodes.OK).json({
        success: true,
        message: 'Course is updated successfully',
        data: result,
    });
})

const deleteCourse = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await courseServices.deleteCourseIntoDb(id);
    res.status(StatusCodes.OK).json({
        success: true,
        message: 'Course is deleted successfully',
        data: result,
    });
})

const assignFacultiesWithCourse = catchAsync(async (req, res) => {
    const { courseId } = req.params;
    const { faculties } = req.body;
    const result = await courseServices.assignFacultiesWithCourseIntoDb(courseId, faculties);
    res.status(StatusCodes.OK).json({
        success: true,
        message: 'Course is updated successfully',
        data: result,
    });
})

const removeFacultiesFromCourse = catchAsync(async (req, res) => {
    const { courseId } = req.params;
    const { faculties } = req.body;
    const result = await courseServices.removeFacultiesFromCourseIntoDb(courseId, faculties);
    res.status(StatusCodes.OK).json({
        success: true,
        message: 'Faculties remove successfully',
        data: result,
    });
})



export const courseController = {
    createCourse,
    getSingleCourse,
    getAllCourse,
    updateCourse,
    deleteCourse,
    assignFacultiesWithCourse,
    removeFacultiesFromCourse
}