import express from 'express';
import { StudentRoutes } from '../modules/students/student.route';
import { userRouter } from '../modules/user/user.route';
import { academicSemesterRouter } from '../modules/academiSemester/academicSemester.route';
const router = express.Router();

const moduleRoutes = [
    {
        path: '/student',
        route: StudentRoutes
    },
    {
        path: '/user',
        route: userRouter
    },
    {
        path: '/academic-semester',
        route: academicSemesterRouter
    },
]

moduleRoutes.forEach(route => router.use(route.path, route.route))

export default router;
