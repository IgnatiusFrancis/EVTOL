import express from "express";
import {
  signup,
  login,
  signout,
  getAllUser,
  deleteUser,
} from "../controller/auth/userController.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.get("/signout", signout);
router.get("/getallusers", getAllUser);
router.delete("/deleteuser", deleteUser);

export default router;
