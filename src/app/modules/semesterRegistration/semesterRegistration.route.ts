import express from 'express';
import { validateRequest } from '../../middleware/validateRequest';
import { semesterRegistrationController } from './semesterRegistration.controller';
import { SemesterRegistrationValidations } from './semesterRegistration.validation';
const router = express.Router();

router.post('/create-semester-registration', validateRequest(SemesterRegistrationValidations.createSemesterRegistrationValidationSchema), semesterRegistrationController.createSemesterRegistration)
router.get('/', semesterRegistrationController.getAllSemesterRegistration);
router.get('/:semesterId', semesterRegistrationController.getSingleSemesterRegistration);
router.patch("/:semesterId", validateRequest(SemesterRegistrationValidations.updateSemesterRegistrationValidationSchema), semesterRegistrationController.updateSemesterRegistration)

export const semesterRegistrationRouter = router;