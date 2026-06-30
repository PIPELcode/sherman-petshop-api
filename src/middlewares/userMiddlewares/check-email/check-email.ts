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

<<<<<<< HEAD
        } catch (error) {
=======
      } catch (error: any) {
        
        console.log("LOG DE ERROR:", error.message); // Esto se verá en los logs de Vercel
>>>>>>> ade7b59d6d88f03b14cbf1df30c5fbcff2291ae5
        res.status(500).json({ 
            message: "Error checking email",
            debug: error.message // Lo vemos en Postman para no adivinar
        });
    }
}
