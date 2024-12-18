import express from 'express';
import { StudentController } from './student.controller';
const router = express.Router();

router.get('/', StudentController.getAllStudent);
router.get('/:studentId', StudentController.getSingleStudent);
router.patch('/:studentId', StudentController.updateStudent);
router.delete('/:studentId', StudentController.deleteStudent)

export const StudentRoutes = router;
