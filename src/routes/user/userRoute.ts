import { Router } from "express";

//controllers
import { registerUser } from "../../controller/user/userHash/hash";
import { loginUser } from "../../controller/user/loginController/login";

//middlewares
import { checkEmail } from "../../middlewares/userMiddlewares/check-email/check-email";
import { checkRegisterData } from "../../middlewares/userMiddlewares/check-register-data/checkRegisterData";
import { checkLoginData } from "../../middlewares/userMiddlewares/check-login-data/checkLoginData";
import { validateJWT } from "../../middlewares/userMiddlewares/validate-JWT/validateJWT";
import { getUserProfile } from "../../controller/user/userProfile/profileController";

const router = Router();

// -POST/api/user/register

router.post("/register", checkRegisterData, checkEmail, registerUser);

// -POST/api/user/login

router.post("/login", checkLoginData, loginUser);

// -GET/api/user/profile

router.get("/profile", validateJWT, getUserProfile);

export default router;