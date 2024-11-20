import express from 'express';
import { validateRequest } from '../../middleware/validateRequest';
import { studentValidation } from '../students/student.validation';
import { userController } from './user.controller';
const router = express.Router();


router.post('/create-student', validateRequest(studentValidation.studentValidationSchema), userController.createStudent)

export const userRouter = router;