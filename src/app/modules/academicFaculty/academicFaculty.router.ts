import express from 'express';
import { validateRequest } from '../../middleware/validateRequest';
import { academicFacultyController } from './academicFaculty.controller';
import { academicFacultyValidation } from './academicFaculty.validation';
const router = express.Router();

router.post('/create-academic-faculty', validateRequest(academicFacultyValidation.academicFacultyValidationSchema), academicFacultyController.createAcademicFaculty)
router.get('/', academicFacultyController.getAllAcademicFaculty)
router.get('/:id', academicFacultyController.getSingleAcademicFaculty)
router.patch('/:id', academicFacultyController.updateAcademicFaculty)

export const academicFacultyRouter = router;