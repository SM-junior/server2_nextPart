import express from 'express';
import { validateRequest } from '../../middleware/validateRequest';
import { academicSemesterController } from './academicSemester.controller';
import { academicSemesterValidation } from './academicSemester.validation';
const router = express.Router();

router.post('/create-academic-semester', validateRequest(academicSemesterValidation.academicSemesterValidationSchema), academicSemesterController.createAcademicSemester);
router.get('/', academicSemesterController.getAllAcademicSemester);
router.patch('/:id', validateRequest(academicSemesterValidation.academicSemesterValidationSchema), academicSemesterController.updateAcademicSemester)

export const academicSemesterRouter = router;