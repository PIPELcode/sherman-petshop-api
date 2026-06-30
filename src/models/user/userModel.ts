import { Schema, model } from "mongoose";

export interface User {
    name: string;
    email: string;
    password: string;
}

const userSchema = new Schema<User>(
    {
    name: { 
        type: String, 
        required: [true, "Name is required"] },
    email: { 
        type: String, 
        required: [true, "Email is required"], 
        unique: true },
    password: { 
        type: String, 
        required: [true, "Password is required"] },
    },
    
    {
        toJSON: {
            transform: function (doc, ret: any) {
                ret.id = ret._id;
                delete ret._id;
                delete ret.__v;
                delete ret.password; 
                return ret;
            },
        },
    }
);

export const UserModel = model<User>("User", userSchema);