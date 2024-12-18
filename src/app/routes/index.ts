import express from 'express';
import { StudentRoutes } from '../modules/students/student.route';
import { userRouter } from '../modules/user/user.route';
import { academicSemesterRouter } from '../modules/academicSemester/academicSemester.route';
import { academicFacultyRouter } from '../modules/academicFaculty/academicFaculty.router';
import { academicDepartmentRouter } from '../modules/academicDepartment/academicDepartment.router';
import { facultyRouter } from '../modules/faculty/faculty.router';
import { adminRouter } from '../modules/admin/admin.router';
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
    {
        path: '/academic-faculty',
        route: academicFacultyRouter
    },
    {
        path: '/academic-department',
        route: academicDepartmentRouter
    },
    {
        path: '/faculty',
        route: facultyRouter
    },
    {
        path: '/admin',
        route: adminRouter
    }
]

moduleRoutes.forEach(route => router.use(route.path, route.route))

export default router;
