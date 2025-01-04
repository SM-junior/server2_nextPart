import express from 'express';
import { validateRequest } from '../../middleware/validateRequest';
import { courseController } from './course.controller';
import { courseValidation } from './course.validation';
const router = express.Router();

router.post('/create-course', validateRequest(courseValidation.createCourseValidationSchema), courseController.createCourse)
router.get('/', courseController.getAllCourse);
router.get('/:id', courseController.getSingleCourse);
router.delete('/:id', courseController.deleteCourse);
router.patch('/:id', validateRequest(courseValidation.updateCourseValidationSchema), courseController.updateCourse);
router.put('/:courseId/assign-faculties', validateRequest(courseValidation.facultyWithCourseValidationSchema), courseController.assignFacultiesWithCourse)
router.delete('/:courseId/remove-faculties', validateRequest(courseValidation.facultyWithCourseValidationSchema), courseController.removeFacultiesFromCourse)


export const courseRouter = router;