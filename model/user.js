import mongoose from "mongoose";
import bcrypt from "bcryptjs";
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    payment: { type: String, required: false, default: "Credit Card" },
    model: { type: String, required: false, default: "Lightweight" },
    shipping: { type: String, required: false, default: "Ground" },
  },
  { timestamps: true }
);

userSchema.methods.confirmPassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

const User = mongoose.model("User", userSchema);
export default User;
