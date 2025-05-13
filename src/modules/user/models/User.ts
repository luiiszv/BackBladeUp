import { Schema, model, Document } from "mongoose";
import { IUser } from "../interfaces/user.interface";



const userSchema = new Schema<IUser>({
    name: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: /.+\@.+\..+/
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ["barber", "client"],
        required: false
    },
    creationDate: {
        type: Date,
        default: Date.now
    },
    active: {
        type: Boolean,
        default: true
    }
});

// Exporta el modelo
export const UserModel = model<IUser>("User", userSchema);