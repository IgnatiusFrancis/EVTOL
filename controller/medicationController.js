import MedicationData from "../model/medication.js";

export const displayAlladdedEvtol = async (req, res) => {
  try {
    const addEvtol = await MedicationData.find();
    res.status(200).json({
      status: "success",
      addEvtol,
    });
  } catch (error) {
    res.status(404).json({
      message: "Unable to display added Evtol",
      error: error.message,
    });
  }
};
