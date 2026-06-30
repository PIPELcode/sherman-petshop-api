import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export interface AutReq extends Request {
    uid?: string;
}

export const validateJWT = (req: AutReq, res: Response, next: NextFunction): void => {
    const authHeader = req.header("Authorization");
    const token = authHeader?.replace("Bearer ", "");

    if (!token) {
        res.status(401).json({ message: "Access denied" });
        return;
    }

    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET as string) as { uid: string };
        req.uid = payload.uid;

        next();

    } catch (error) {
        res.status(401).json({ message: "Invalid token" });
    }
};