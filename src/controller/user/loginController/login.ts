import { Request, Response } from "express";
import { User, UserModel } from "../../../models/user/userModel";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const loginUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const { email, password }: User = req.body;
        const user = await UserModel.findOne({ email});

        if (!user) {
            res.status(400).json({ 
                message: "Invalid credentials" 
            });
            return;
        }

        const theAunthPepper = process.env.PEPPER_KEY;
        if (!theAunthPepper) throw new Error("PEPPER_KEY is not defined in the environment variables");

        const isMatch = await bcrypt.compare(password + theAunthPepper, user.password);
        if (!isMatch) {
            res.status(400).json({ 
                message: "Credentials do not match" 
            });
            return;
        }

        const token = jwt.sign(
            { uid: user.id},
            process.env.JWT_SECRET as string,
            { expiresIn: "2h" }
        );

        res.status(200).json({ 
            message: "Login successful",
            token,
        });

    } catch (error) {
        res.status(500).json({ 
            message: "Error logging in" 
        });
    }
};