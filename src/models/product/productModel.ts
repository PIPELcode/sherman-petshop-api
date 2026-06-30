import { Schema, model } from "mongoose";

export  interface Product {
    name: string;
    productImg: string;
    price: number;
    category: string[];
    createdAt: Date;
    updatedAt: Date;
}

const productSchema = new Schema<Product>(
    {
        name:{
            type: String,
            required: [true, "Name is required"],
            trim: true,
        },
        productImg:{
            type: String,
            required: [true, "Product image is required"],
        },
        price:{
            type: Number,
            required: [true, "Price is required"],
            min: [0, "Price must be greater than or equal to 0"],
        },
        category:{
            type: [String],
            required: [true, "Category is required"],
            validate: {
                validator: function (v: string[]) {
                    return v.length > 0;
                },
                message: "At least one category is required"
            },
        },
    },
    {
        timestamps: true,
        toJSON: {
            transform: function (doc, ret: any) {
                ret.id = ret._id;
                delete ret._id;
                delete ret.__v;
                return ret;
            },
        },
    }
)

export const ProductModel = model<Product>("Product", productSchema);