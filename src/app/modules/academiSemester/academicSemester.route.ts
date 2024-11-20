import express from 'express';
import { validateRequest } from '../../middleware/validateRequest';
import { academicSemesterController } from './academicSemester.controller';
import { academicSemesterValidation } from './academicSemester.validation';
const router = express.Router();

router.post('/create-academic-semester', validateRequest(academicSemesterValidation.academicSemesterValidationSchema), academicSemesterController.createAcademicSemester,)


export const academicSemesterRouter = router;