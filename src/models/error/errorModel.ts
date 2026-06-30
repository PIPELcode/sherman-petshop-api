import { model, Schema } from "mongoose";


export interface ErrorLog{
    statusCode: number;
    method: string;
    messageError: string;
    createdAt?: Date;
}

const errorSchema = new Schema<ErrorLog>(
    {
        statusCode: {type: Number, required: true},
        method: {type: String, required: true},
        messageError: {type: String, required: true},
    },
    {
        timestamps: { createdAt: true, updatedAt: false}
    }
);

export const ErrorLogModel = model<ErrorLog>("ErrorLog", errorSchema);