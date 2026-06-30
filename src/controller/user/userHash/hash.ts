import { Request, Response } from "express";
import { User, UserModel } from "../../../models/user/userModel";
import bcrypt from "bcryptjs";

export const registerUser = async (req: Request, res: Response) => {
    try {
        const { name, email, password }:User = req.body;
        const user = new UserModel({ name, email, password });

        const theAunthPepper = process.env.PEPPER_KEY;
        if (!theAunthPepper) throw new Error("PEPPER_KEY is not defined in the environment variables");

        const pepperedPassword = password + theAunthPepper;

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(pepperedPassword, salt);

        await user.save();

        res.status(201).json({ 
            message: "User registered successfully" 
        });

    } catch (error) {

        res.status(500).json({ 
            message: "Error registering user" 
        });

    }
}