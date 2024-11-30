import { model, Schema } from "mongoose";
import { TAcademicDepartment } from "./academicDepartment.interface";

export const academicDepartmentSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    academicFaculty: {
        type: Schema.Types.ObjectId,
        ref: "AcademicFaculty",
        requires: true,
    }
}, {
    timestamps: true
})

academicDepartmentSchema.pre('save', async function (next) {
    const isDepartmentExists = await AcademicDepartment.findOne({ name: this.name });
    if (isDepartmentExists) {
        throw new Error('This Academic department is already exists')
    }
    next()
})

academicDepartmentSchema.pre('findOneAndUpdate', async function (next) {
    const query = this.getQuery();
    const isDepartmentExists = await AcademicDepartment.findOne(query);
    if (!isDepartmentExists) {
        throw new Error('Academic department is not found')
    }
    next()
})
academicDepartmentSchema.pre('find', async function (next) {
    const query = this.getQuery();
    const isDepartmentExists = await AcademicDepartment.findOne(query);
    if (!isDepartmentExists) {
        throw new Error('Academic department is not found')
    }
    next()
})



export const AcademicDepartment = model<TAcademicDepartment>('AcademicDepartment', academicDepartmentSchema)