import { Router } from "express";

const router = Router();

//middlewares
import { checkProductData } from "../../middlewares/productMiddlewares/check-data/checkProductData";

//controller
import { createProduct } from "../../controller/product/create-product/createProduct";
import { getProducts } from "../../controller/product/get-products/getProducts";
import { getProductById } from "../../controller/product/get-product-by-id/getProductById";

//-POST/api/product para crear un producto

router.post("/", checkProductData, createProduct);

//-GET/api/ para obtener todos los productos

router.get("/", getProducts);

//-GET/api/:id para obtener un producto por su ID

router.get("/:id", getProductById);

export default router;