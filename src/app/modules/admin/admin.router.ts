import express from 'express';
import { AdminController } from './admin.controller';
const router = express.Router();


router.get('/', AdminController.getAllAdmin);
router.get('/:id', AdminController.getSingleAdmin);
router.delete('/:id', AdminController.deleteAdmin);


export const adminRouter = router;