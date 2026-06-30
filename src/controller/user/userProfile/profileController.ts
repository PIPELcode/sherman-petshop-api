import { NextFunction, Response } from "express";
import { AutReq } from "../../../middlewares/userMiddlewares/validate-JWT/validateJWT";
import { UserModel } from "../../../models/user/userModel";

export const getUserProfile = async (req: AutReq, res: Response, next: NextFunction): Promise<void> => {
    try {
        const uid = req.uid;
        const user = await UserModel.findById(uid);
        if (!user) {
            res.status(404).json({ message: "User not found" });
            return;
        }
        res.status(200).json(user);
    } catch (error) {
        next(error);
    }

}