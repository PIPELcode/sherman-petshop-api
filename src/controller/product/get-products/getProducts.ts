import { Request, Response, NextFunction } from "express";
import { ProductModel } from "../../../models/product/productModel";

export const getProducts = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const products = await ProductModel.find();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: "Error retrieving products" });
    }
}