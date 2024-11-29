import express from 'express';
import { validateRequest } from '../../middleware/validateRequest';
import { academicDepartmentController } from './academicDepartment.controller';
import { academicDepartmentValidation } from './academicDepartment.validation';
const router = express.Router();

router.post('/create-academicDepartment', validateRequest(academicDepartmentValidation.academicDepartmentValidationSchema), academicDepartmentController.createAcademicDepartment)
router.get('/:id', academicDepartmentController.getSingleAcademicDepartment);
router.get('/', academicDepartmentController.getAllAcademicDepartment);
router.patch('/:id', validateRequest(academicDepartmentValidation.academicDepartmentUpdateSchema), academicDepartmentController.updateAcademicDepartment)


export const academicDepartmentRouter = router;
