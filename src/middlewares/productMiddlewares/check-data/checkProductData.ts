import { Request, Response, NextFunction } from "express";

export const checkProductData = (req: Request, res: Response, next: NextFunction): void => {

    const products = Array.isArray(req.body) ? req.body : [req.body];

    if (products.length === 0 ) {
        res.status(400).json({ message: "Product data is required" });
        return;
    }

    for (const product of products) {
        const { name, productImg, price, category } = product; 

        if (!name || typeof name !== "string" || name.trim() === "") {
            res.status(400).json({ message: "Name is required and must be a non-empty string" });
            return;
        }
        if (!productImg || typeof productImg !== "string" || productImg.trim() === "") {
            res.status(400).json({ message: "Product image is required and must be a non-empty string" });
            return;
        }
        if (price === undefined || typeof price !== "number" || price < 0) {
            res.status(400).json({ message: "Price is required and must be a number greater than or equal to 0" });
            return;
        }
        if (!Array.isArray(category) || category.length === 0 || !category.every((cat: any) => typeof cat === "string" && cat.trim() !== "")) {
            res.status(400).json({ message: "Category is required and must be a non-empty array of non-empty strings" });
            return;
        }
        
        }
    next();
}