import mongoose from "mongoose";
const Schema = mongoose.Schema;

const eVTOLSchema = new Schema({
  serialNumber: { type: String, required: true, maxlength: 100 },
  model: {
    type: String,
    required: true,
    enum: ["Lightweight", "Middleweight", "Cruiserweight", "Heavyweight"],
  },
  weightLimit: { type: Number, required: true, max: 500 },
  batteryCapacity: { type: Number, required: true },
  state: {
    type: String,
    required: true,
    enum: ["IDLE", "LOADING", "LOADED", "DELIVERING", "DELIVERED", "RETURNING"],
    default: "IDLE",
  },
});
const EVTOL = mongoose.model("eVTOL", eVTOLSchema);

export default EVTOL;

// A2-Cal Aptos Blue.
// ACS Aviation Z-300.
// Advanced Research Foundation Cyclocar.
// Advanced System Engineering - FIPSI BX4.
// Advanced System Engineering - FIPSI WX4.
// Advanced Tactics Barracuda.
// aeroG Aviation aG-4 Liberty.
// aeroG Aviation UV-4.

// Manufacturing company
// Editor's Picks.
// UAM.
// eVTOL.
// Electric.
// Vertical Aerospace.
// Lilium.
// Archer.

//Brands
// Suzuki SkyDrive SD-XX (2025) ...
// Lilium Jet (2025) ...
// Manta ANN (2026) ...
// Volocopter VoloConnect (2026) ...
// Supernal (2028) ...
// Wisk (2032) Image: Wisk Aero. ...
// eVTOL flying car – The Leo Coupe (TBC) Image: Urban. ...
// Honorable mention: JetPack Aviation Speeder (2023) Image: JetPack Aviation.
