
import { model, Schema } from 'mongoose';
import { TAcademicFaculty } from './academicFaculty.interface';
export const academicFacultySchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    }
}, {
    timestamps: true
})

export const AcademicFaculty = model<TAcademicFaculty>('academicFaculty', academicFacultySchema)