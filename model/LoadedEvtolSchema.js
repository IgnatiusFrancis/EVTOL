import Evtol from "../model/addEvtolSchema.js";

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

LoadedEvtolSchema.virtual("manufacturer").get(function () {
  return this.evtol.manufacturer;
});

LoadedEvtolSchema.virtual("batteryLevel").get(function () {
  return this.evtol.batteryLevel;
});

const LoadedEvtolModel = mongoose.model("LoadedEvtol", LoadedEvtolSchema);
