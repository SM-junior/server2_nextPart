import { TAcademicSemester } from "../academicSemester/academicSemester.interface";
import { User } from "./user.model";

const findLastStudentId = async () => {
    const lastStudentId = await User.findOne(
        {
            role: 'student'
        },
        { id: 1, _id: 0 }
    )
        .sort({ createdAt: -1 })
        .lean();
    return lastStudentId?.id ? lastStudentId.id : undefined; //'2030010001'
}

export const generatedStudentId = async (payload: TAcademicSemester) => {
    let currentId = (0).toString();

    const lastStudentId = await findLastStudentId();  //'2030010001'
    const lastStudentSemesterCode = lastStudentId?.substring(4, 6);
    const lastStudentYear = lastStudentId?.substring(0, 4);
    const currentSemesterCode = payload.code;
    const currentYear = payload.year;

    if (lastStudentId && lastStudentSemesterCode === currentSemesterCode && lastStudentYear === currentYear) {
        currentId = lastStudentId.substring(6) //'0001'
    }

    let incrementId = (Number(currentId) + 1).toString().padStart(4, '0');
    incrementId = `${payload.year}${payload.code}${incrementId}`;
    return incrementId;
}


const findLastFacultyId = async () => {
    const lastFacultyId = await User.findOne(
        { role: 'faculty' },
        { id: 1, _id: 0 },
    ).sort({ createdAt: -1 }).lean();
    console.log(lastFacultyId?.id ? lastFacultyId.id.substring(2) : undefined);
    return lastFacultyId?.id ? lastFacultyId.id.substring(2) : undefined;  //0001
}

export const generatedFacultyId = async () => {
    let currentId = (0).toString();
    const lastFacultyId = await findLastFacultyId();  //F-0001
    if (lastFacultyId) {
        // currentId = lastFacultyId.substring(2); //01
        currentId = lastFacultyId; //0001
        console.log(`currentId:`, currentId);
    }
    let incrementId = (Number(currentId) + 1).toString().padStart(4, '0');
    console.log(`incrementId`, incrementId);
    incrementId = `F-${incrementId}`;
    return incrementId;
}

const findLastAdminId = async () => {
    const lastAdminId = await User.findOne(
        {
            role: 'admin'
        },
        {
            id: 1, _id: 0
        },
    ).sort({ createdAt: -1 }).lean();
    return lastAdminId?.id ? lastAdminId.id.substring(2) : undefined;
}

export const generatedAdminId = async () => {
    let currentId = (0).toString();  // '0';
    const lastAdminId = await findLastAdminId();
    if (lastAdminId) {
        currentId = lastAdminId;
    }
    let incrementId = (Number(currentId) + 1).toString().padStart(4, '0');
    incrementId = `A-${incrementId}`;
    return incrementId;
}