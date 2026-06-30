import { Request, Response, NextFunction } from "express";
import { ErrorLogModel } from "../../models/error/errorModel";

export const errorHandler = async ( err: any, req: Request, res: Response, next: NextFunction): Promise<void> => {
    const statusCode = err.statusCode || 500;
    const errorMessage = err.message || "Internal Server Error";

    console.error(`[ERROR] [${req.method} ${req.url}] - Status: ${statusCode} - ${errorMessage}`);

    try {
        await ErrorLogModel.create({
            statusCode,
            method: req.method,
            messageError: errorMessage
        });
    } catch (error) {
        console.error("Failed to log error to database:", error);
    }

    res.status(statusCode).json({
        message: errorMessage,
    });
}