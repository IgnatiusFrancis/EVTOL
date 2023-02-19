import mongoose from "mongoose";
// import bcrypt from "bcryptjs";
// import jwt from "jsonwebtoken";

const rentEvtolSchema = new mongoose.Schema(
  {
    serialNumber: {
      type: String,
      unique: true,
      default: function () {
        let serialNumber = "";
        const characters =
          "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        const charactersLength = characters.length;
        for (let i = 0; i <= 100; i++) {
          serialNumber += characters.charAt(
            Math.floor(Math.random() * charactersLength)
          );
        }
        return serialNumber;
      },
    },
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
      required: false,
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
    batteryLevel: {
      type: Number,
      required: true,
      min: 0,
      max: 100,
      default: 100,
    },
    medications: {
      type: [
        {
          name: {
            type: String,
            required: false,
            match: /^[a-zA-Z0-9-_]+$/,
          },
          weight: {
            type: Number,
            required: false,
            min: 0,
          },
          code: {
            type: String,
            required: false,
            // match: /^[A-Z0-9_]+$/,
          },
          image: { type: String, required: false },
          destination: {
            type: String,
            required: false,
          },
        },
      ],
    },
  },
  { timestamps: true }
);

rentEvtolSchema.index({ brand: "text", model: "text" });

const RentEvtol = mongoose.model("RentEvtol", rentEvtolSchema);

export default RentEvtol;
