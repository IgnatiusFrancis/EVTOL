import RentEvtol from "../model/addEvtolSchema.js";
import mongoose from "mongoose";

const LoadedEvtolSchema = new mongoose.Schema({
  serialNumber: {
    type: String,
    required: true,
    unique: true,
  },
  medications: [
    {
      name: {
        type: String,
        required: true,
      },
      weight: {
        type: Number,
        required: true,
      },
    },
  ],
  evtol: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Evtol",
    required: true,
  },
});

LoadedEvtolSchema.virtual("brand").get(function () {
  return this.evtol.brand;
});

LoadedEvtolSchema.virtual("model").get(function () {
  return this.evtol.model;
});

LoadedEvtolSchema.virtual("state").get(function () {
  return this.evtol.state;
});

const LoadedEvtolModel = mongoose.model("LoadedEvtol", LoadedEvtolSchema);
export default LoadedEvtolModel;
