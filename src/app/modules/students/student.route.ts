import express from 'express';
import { StudentController } from './student.controller';
const router = express.Router();

router.get('/', StudentController.getAllStudent);
router.get('/:id', StudentController.getSingleStudent);
router.patch('/:id', StudentController.updateStudent);
router.delete('/:id', StudentController.deleteStudent)

export const StudentRoutes = router;
