import adminUser from "../../model/adminSchema.js";
import bcrypt from "bcryptjs";
import validator from "validator";
import generateToken from "../../utils/generateToken.js";

export const adminSignup = async (req, res) => {
  try {
    let { adminName, email, adminPassword, confirmPassword } = req.body;

    if (!adminName || !email || !adminPassword || !confirmPassword) {
      return res.status(422).json({ error: "Please filled the form properly" });
    }
    const adminExist = await adminUser.findOne({ email });
    if (adminExist) {
      res.status(422).json({ Message: "User already exist" });
      return;
    }

    if (adminPassword.length < 6) {
      return res
        .status(422)
        .json({ error: "Password should be of at least 6 characters" });
    }

    if (confirmPassword !== adminPassword) {
      return res.status(422).json({ error: "Passwords Must Matched" });
    }

    if (adminPassword) {
      const salt = bcrypt.genSaltSync(10);
      adminPassword = bcrypt.hashSync(adminPassword, salt);
    }

    if (!adminName || !email || !adminPassword) {
      return res
        .status(422)
        .json({ error: "Username, email and password are must" });
    }

    if (!validator.isEmail(email)) {
      return res.status(422).json({ error: "Invaid email" });
    }

    const admin = await adminUser.create({
      adminName,
      email,
      adminPassword,
    });
    const token = generateToken(admin._id);

    res.status(201).json({
      status: "success",
      token,
      data: {
        admin,
      },
    });
  } catch (error) {
    res.status(404).json({
      error: "user not found",
      error: error.message,
    });
  }
};

export const signinAdmin = async (req, res) => {
  try {
    const { email, adminPassword } = req.body;
    if (!email || !adminPassword) {
      return res.status(422).json({ message: "Email and password are must" });
    }
    if (!validator.isEmail(email)) {
      return res.status(422).json({ message: "Invalid email" });
    }
    const admin = await adminUser.findOne({ email });
    if (!admin) {
      return res.status(404).json({ message: "This email does not exist" });
    }
    if (!admin.confirmPassword(adminPassword)) {
      return res.status(401).json({ message: "Incorrect password" });
    }

    const token = generateToken(admin._id);

    res.status(200).json({ admin, token });
  } catch (error) {
    res.status(404).json({
      message: "admin not found",
      error: error.message,
    });
  }
};

export const dashboard = async (req, res) => {
  try {
    res.status(200).json({
      message: "Success",
    });
  } catch (error) {
    console.log(error.message);
  }
};
