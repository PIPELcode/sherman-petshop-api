import { Router } from "express";
import userRouter from "./user/userRoute";
import productRouter from "./product/productRoute";

const router = Router();

// ACA VAN TODAS LAS RUTAS DE LA API
//Acordarse que es api/ y la ruta

router.use("/user", userRouter);
router.use("/product", productRouter);

export default router;