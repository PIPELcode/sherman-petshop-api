import { Request, Response, NextFunction } from 'express';
import { ProductModel } from '../../../models/product/productModel';

export const createProduct = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try{
        const productsData = Array.isArray(req.body) ? req.body : [req.body];

        const newProducts = await ProductModel.insertMany(productsData);

        res.status(201).json({
            message: productsData.length > 1 
            ? "Products created successfully" 
            : "Product created successfully",
            products: newProducts
        });

    } catch (error) {
        res.status(500).json({
            message: "Error creating product"
        });
    }
}