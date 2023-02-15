import express from "express";
const router = express.Router();

import RentEvtol from "../model/addEvtolSchema.js";

module.exports = router.post(
  "/deleteRentBikeFromDashboard",
  async (req, res) => {
    const getId = req.body.bikeIdFromDashBoard;
    const x = getId;
    const findBike = await RentEvtol.findOneAndDelete({ _id: x });
  }
);
