import RentEvtol from "../model/addEvtolSchema";

export const checkBatteryLevel = async (req, res, next) => {
  try {
    // Find the eVTOL instance you want to update
    const eVTOL = await RentEvtol.findById(id);

    // Determine how many medications are being loaded onto the eVTOL
    const numMedications = medications.length;

    // Define how much to reduce the batteryLevel for each medication being carried
    const batteryLevelReductionPerMedication = 10;

    // Calculate how much to reduce the batteryLevel by based on the number of medications being carried
    const batteryLevelReduction =
      numMedications * batteryLevelReductionPerMedication;

    // Reduce the batteryLevel by the appropriate amount
    eVTOL.batteryLevel -= batteryLevelReduction;

    // Save the changes to the eVTOL instance
    await eVTOL.save();
  } catch (error) {}
};
