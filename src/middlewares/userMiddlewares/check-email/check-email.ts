import { Request, Response, NextFunction } from "express";
import { UserModel } from "../../../models/user/userModel";

export const checkEmail = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
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
    console.error("Error detallado:", error); // Esto se verá en los logs de Vercel
    res.status(500).json({ 
        message: "Error checking email",
        details: error // SOLO para debug, borralo después
    });
    }

}
