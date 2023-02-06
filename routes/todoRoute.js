import express from "express";

import {
  getAllTodos,
  createTodo,
  updateTodo,
  deleteTodo,
} from "../controller/todoController.js";
import { isLogin } from "../middleware/isLogin.js";

const router = express.Router();

router.route("/").get(isLogin, getAllTodos);
router.route("/").post(createTodo);
router.route("/:id").patch(updateTodo).delete(deleteTodo);

export default router;
