import express from 'express';
import { validateRequest } from '../../middleware/validateRequest';
import { adminValidations } from '../admin/admin.validation';
import { facultyValidation } from '../faculty/faculty.validation';
import { studentValidation } from '../students/student.validation';
import { userController } from './user.controller';
const router = express.Router();


router.post('/create-student', validateRequest(studentValidation.studentValidationSchema), userController.createStudent)
router.post('/create-faculty', validateRequest(facultyValidation.facultyValidationSchema), userController.createFaculty)
router.post('/create-admin', validateRequest(adminValidations.adminValidationSchema), userController.createAdmin)

export const userRouter = router