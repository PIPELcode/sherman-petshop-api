import { Request, Response, NextFunction } from "express";

export const checkRegisterData = (req: Request, res: Response, next: NextFunction): void => {
    const { name, email, password } = req.body;

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

    const errors: string[] = [];

    if (!name || name.length < 3) {
        errors.push("Name must be at least 3 characters long");
    }
    if (!email || !emailRegex.test(email)) {
        errors.push("Invalid email format");
    }
    if (!password || !passwordRegex.test(password)) {
        errors.push("Password must be at least 8 characters long and contain at least one letter and one number");
    }

    if (errors.length > 0) {
        res.status(400).json({ errors });
        return;
    }
    next();
}

