
import { Request, Response, NextFunction } from "express";
import { ProductModel } from "../../../models/product/productModel";
import mongoose from "mongoose";

export const getProductById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { id } = req.params;

        if (typeof id !== 'string' || !mongoose.Types.ObjectId.isValid(id)) {
            res.status(400).json(
                { 
                    message: "Invalid product ID" 

                }
            );
            return;
        }

        const product = await ProductModel.findById(id);
        if (!product) {
            res.status(404).json(
                { 
                    message: "Product not found" 
                }
            );
            return;
        }

        res.status(200).json(product);
        
    }catch (error) {
        res.status(500).json({ message: "Error retrieving product by ID" });
    }
}