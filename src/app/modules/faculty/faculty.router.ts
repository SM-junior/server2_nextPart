import express from 'express';
import { facultyController } from './faculty.controller';
const router = express.Router();

router.get('/', facultyController.getAllFaculty);
router.get('/:id', facultyController.getSingleFaculty);
router.delete('/:id', facultyController.deleteFaculty);


export const facultyRouter = router;