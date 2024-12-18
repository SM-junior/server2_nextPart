
import mongoose, { model, Schema } from 'mongoose';
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

export const AcademicFaculty = mongoose.model<TAcademicFaculty>('AcademicFaculty', academicFacultySchema)