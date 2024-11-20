import { model, Schema } from "mongoose";
import { TUser } from "./user.interface";
import bcrypt from 'bcrypt'
import config from "../../config";

const UserSchema: Schema<TUser> = new Schema(
    {
        id: { type: String, unique: true },
        password: { type: String },
        needPasswordChange: { type: Boolean, default: true },
        role: {
            type: String,
            enum: ['admin', 'faculty', 'student'],
        },
        status: {
            type: String,
            enum: ['in-progress', 'blocked'],
            default: 'in-progress'
        },
        isDeleted: { type: Boolean, default: false },
    },
    { timestamps: true } // Automatically adds createdAt and updatedAt fields
);

UserSchema.pre('save', async function (next) {
    const user = this;
    user.password = await bcrypt.hash(user.password, Number(config.bcrypt_salt_round))
    next();
})

UserSchema.post('save', function (doc, next) {
    doc.password = ""; // Set the password field to an empty string
    next();
});

// Export the model
export const User = model<TUser>('User', UserSchema)