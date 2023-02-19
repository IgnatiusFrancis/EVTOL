import express from "express";
import { isLogin } from "../middleware/isLogin.js";
import {
  adminSignup,
  signinAdmin,
  dashboard,
} from "../controller/auth/adminController.js";

const router = express.Router();

router.post("/signUpAdmin", adminSignup);
router.post("/signinAdmin", signinAdmin);
router.get("/dashboard", dashboard);

export default router;
