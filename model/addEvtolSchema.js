import mongoose from "mongoose";
// import bcrypt from "bcryptjs";
// import jwt from "jsonwebtoken";

const rentEvtolSchema = new mongoose.Schema(
  {
    serialNumber: { type: String, maxlength: 100 },
    brand: {
      type: String,
      required: true,
    },
    model: {
      type: String,
      required: true,
      enum: ["Lightweight", "Middleweight", "Cruiserweight", "Heavyweight"],
    },
    year: {
      type: String,
      required: true,
    },
    color: {
      type: String,
      required: true,
    },
    // price: {
    //   type: String,
    //   required: true,
    // },
    fileName: {
      type: String,
      required: true,
    },
    filePath: {
      type: String,
      required: true,
    },
    fileType: {
      type: String,
      required: true,
    },
    fileSize: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
      enum: [
        "IDLE",
        "LOADING",
        "LOADED",
        "DELIVERING",
        "DELIVERED",
        "RETURNING",
      ],

      default: "IDLE",
    },
    weightLimit: { type: Number, required: true, max: 500 },
    batteryCapacity: { type: Number, default: 100 },
  },
  { timestamps: true }
);

rentEvtolSchema.index({ brand: "text", model: "text" });

const RentEvtol = mongoose.model("RentEvtol", rentEvtolSchema);

export default RentEvtol;
