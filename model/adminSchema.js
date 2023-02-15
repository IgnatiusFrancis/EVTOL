import mongoose from "mongoose";
import bcrypt from "bcryptjs";
const Schema = mongoose.Schema;

const adminSchema = new Schema(
  {
    adminName: { type: String, required: true },
    email: { type: String, required: true },
    adminPassword: { type: String, required: true },
  },
  { timestamps: true }
);

adminSchema.methods.confirmPassword = function (password) {
  return bcrypt.compareSync(password, this.adminPassword);
};

const adminUser = mongoose.model("adminUser", adminSchema);
export default adminUser;
