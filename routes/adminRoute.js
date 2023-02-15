import express from "express";
import {
  adminSignup,
  signinAdmin,
} from "../controller/auth/adminController.js";

const router = express.Router();

router.post("/signUpAdmin", adminSignup);
router.post("/signinAdmin", signinAdmin);

export default router;
