import jwt from "jsonwebtoken";
import User from "../model/user.js";

export const isLogin = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return res
      .status(400)
      .json({ message: "You are not logged in! Please log in to continue" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_KEY);
    const freshUser = await User.findById(decoded.id);

    if (!freshUser) {
      return res
        .status(400)
        .json({ message: "The user with this token no longer exist" });
    }
  } catch (err) {
    console.error(err.message);
  }

  return next();
};
