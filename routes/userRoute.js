import express from "express";
import { isLogin } from "../middleware/isLogin.js";
import { signup, login } from "../controller/auth/userController.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);

export default router;
