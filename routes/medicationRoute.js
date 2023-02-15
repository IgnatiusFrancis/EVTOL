import express from "express";
import { signup } from "../controller/auth/userController.js";

const router = express.Router();

router.post("/signup", signup);

export default router;
