import User from "../../model/user.js";
import bcrypt from "bcryptjs";
import validator from "validator";
import generateToken from "../../utils/generateToken.js";

export const signup = async (req, res) => {
  try {
    let {
      username,
      email,
      password,
      confirmPassword,
      payment,
      shipping,
      model,
    } = req.body;

    if (!username || !payment || !email || !password || !confirmPassword) {
      return res.status(422).json({ error: "Please filled the form properly" });
    }
    const userExist = await User.findOne({ email });
    if (userExist) {
      res.status(422).json({ Message: "User already exist" });
      return;
    }

    if (password.length < 6) {
      return res
        .status(422)
        .json({ error: "Password should be of at least 6 characters" });
    }

    if (confirmPassword !== password) {
      return res.status(422).json({ error: "Passwords Must Matched" });
    }

    if (password) {
      const salt = bcrypt.genSaltSync(10);
      password = bcrypt.hashSync(password, salt);
    }

    if (!username || !email || !password) {
      return res
        .status(422)
        .json({ error: "Username, email and password are must" });
    }

    if (!validator.isEmail(email)) {
      return res.status(422).json({ error: "Invaid email" });
    }

    const user = await User.create({
      username,
      email,
      password,
      payment,
      model,
      shipping,
    });
    const token = generateToken(user._id);

    res.status(201).json({
      status: "success",
      token,
      data: {
        user,
      },
    });
  } catch (error) {
    res.status(404).json({
      error: "user not found",
      error: error.message,
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(422).json({ message: "Email and password are must" });
    }
    if (!validator.isEmail(email)) {
      return res.status(422).json({ message: "Invalid email" });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "This email does not exist" });
    }
    if (!user.confirmPassword(password)) {
      return res.status(401).json({ message: "Incorrect password" });
    }

    const token = generateToken(user._id);

    res.status(200).json({ user, token });
  } catch (error) {
    res.status(404).json({
      message: "User not found",
      error: error.message,
    });
  }
};

export const signout = async (req, res) => {
  try {
    res.clearCookie("token", { path: "/" });

    res.status(200).json({ user, token });
  } catch (error) {
    res.status(404).json({
      message: "User not found",
      error: error.message,
    });
  }
};

export const getAllUser = async (req, res) => {
  try {
    const allUser = await User.find();

    if (allUser) {
      res.status(200).json({
        status: "success",
        allUser,
      });
    }
  } catch (error) {
    res.status(404).json({
      message: "User not found",
      error: error,
    });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    res.status(200).json({
      status: "success",
      data: {
        user,
      },
    });
  } catch (error) {
    res.status(404).json({
      message: "User not found",
      error: error.message,
    });
  }
};

export const getUser = async (req, res) => {
  try {
    console.log(req.userAuth);
    const user = await User.findById(req.params.id);
    if (user) {
      res.status(200).json({
        status: "success",
        data: { user },
      });
    }
  } catch (error) {
    res.status(404).json({
      message: "User not found",
      error: error,
    });
  }
};
