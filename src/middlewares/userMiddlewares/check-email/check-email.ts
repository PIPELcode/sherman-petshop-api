import { Request, Response, NextFunction } from "express";
import { UserModel } from "../../../models/user/userModel";
import { dbConnection } from "../../../config/database/dbConnection";
export const checkEmail = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {

        await dbConnection();
        
        const { email } = req.body;

        const exists = await UserModel.findOne({ email: email });

        if (exists) {
            res.status(400).json({ 
                message: "Email already exists" 
            });
            return;
        }
        next();

    } catch (error) {
        console.error("Error checking email:", error);
        res.status(500).json({ 
            message: "Internal server error" 
        });
    }
}
