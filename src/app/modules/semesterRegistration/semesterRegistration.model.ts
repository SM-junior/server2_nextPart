import { model, Schema } from "mongoose";
import { semesterRegistrationStatus } from "./semesterRegistration.const";
import { TSemesterRegistration } from "./semesterRegistration.interface";

export const semesterRegistrationSchema = new Schema<TSemesterRegistration>({
    academicSemester: {
        type: Schema.Types.ObjectId,
        unique: true,
        ref: 'AcademicSemester',
        required: true,
    },
    status: {
        type: String,
        enum: semesterRegistrationStatus,
        default: 'UPCOMING',
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    },
    minCredit: {
        type: Number,
        required: true,
        default: 3
    },
    maxCredit: {
        type: Number,
        default: 15
    },
}, {
    timestamps: true
})

export const SemesterRegistration = model<TSemesterRegistration>('SemesterRegistration', semesterRegistrationSchema)