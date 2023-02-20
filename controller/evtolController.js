import RentEvtol from "../model/addEvtolSchema.js";
import LoadedEvtolModel from "../model/LoadedEvtolSchema.js";

export const loadEvtol = async (req, res) => {
  try {
    RentEvtol.findOne({ serialNumber: req.params.serialNumber }).then(
      (RentEvtol) => {
        if (!RentEvtol) return res.status(400).json({ msg: "eVTOL not found" });

        if (RentEvtol.state === "LOADING")
          return res.status(400).json({ msg: "eVTOL is already loaded" });

        const numMedications = medications.length;

        const batteryLevelReductionPerMedication = 30;
        const batteryLevelReduction =
          numMedications * batteryLevelReductionPerMedication;

        // Reduce the batteryLevel by the appropriate amount
        RentEvtol.batteryLevel -= batteryLevelReduction;

        if (RentEvtol.batteryLevel < 25)
          return res
            .status(400)
            .json({ msg: "eVTOL battery level is too low" });

        let totalWeight = 0;
        medications.forEach((medication) => {
          totalWeight += medication.weight;
        });

        if (totalWeight > RentEvtol.weightLimit)
          return res
            .status(400)
            .json({ msg: "Total weight exceeds the eVTOL weight limit" });

        RentEvtol.state = "LOADING";

        LoadedEvtolModel.serialNumber = req.body.serialNumber;
        LoadedEvtolModel.medications = medications;
        RentEvtol.medications = medications;
        RentEvtol.save().then((updatedeVTOL) =>
          res.json({
            status: "Success",
            updatedeVTOL,
          })
        );
      }
    );
  } catch (error) {
    res.status(400).json({
      message: "Unable to Load Evtol",
      error: error.message,
    });
  }
};

// setInterval(() => {
//   RentEvtol.find({})
//     .then((RentEvtol) => {
//       RentEvtol.forEach((RentEvtol) => {
//         const newAudit = new audit({
//           eVTOLSerialNumber: RentEvtol.serialNumber,
//           batteryLevel: RentEvtol.batteryLevel,
//           state: RentEvtol.state,
//           date: new Date(),
//         });
//         newAudit.save().catch((err) => console.error(err));
//       });
//     })
//     .catch((err) => console.error(err));
// }, 60000);

export const displayAlladdedEvtol = async (req, res) => {
  try {
    const addEvtol = await RentEvtol.find();
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

export const displayAlladdedEvtolMedicine = async (req, res) => {
  try {
    const addEvtolMed = await LoadedEvtolModel.find();
    res.status(200).json({
      status: "success",
      addEvtolMed,
    });
  } catch (error) {
    res.status(404).json({
      message: "Unable to display Loaded Evtol",
      error: error.message,
    });
  }
};

export const registerEvtol = async (req, res) => {
  try {
    const data = new RentEvtol({
      brand: req.body.brand,
      model: req.body.model,
      year: req.body.year,
      color: req.body.color,
      weightLimit: req.body.weightLimit,
      batteryLevel: req.body.batteryLevel,
      medications: req.body.medications,
      // medications: req.body.code,
      // medications: req.body.destination,
      state: req.body.state,
      fileName: req.file.originalname,
      filePath: req.file.path,
      fileType: req.file.mimetype,
      fileSize: req.file.size,
    });
    await data.save();

    res.status(201).json({
      status: "Data uploaded successfully",
      data,
    });
  } catch (error) {
    res.status(400).json({
      message: "Unable to upload Evtol",
      error: error.message,
    });
  }
};

export const getallRentEvtol = async (req, res) => {
  try {
    const allRentEvtol = await RentEvtol.find();
    res.status(200).json({
      status: "success",
      allRentEvtol,
    });
  } catch (error) {
    res.status(404).json({
      message: "Unable to display Rent Evtol",
      error: error.message,
    });
  }
};

export const getRentData = async (req, res) => {
  try {
    const rentData = await RentEvtol.find();
    res.status(200).json({
      status: "success",
      rentData,
    });
  } catch (error) {
    res.status(404).json({
      message: "Unable to display Rent Evtol",
      error: error.message,
    });
  }
};

export const searchEvtol = async (req, res) => {
  try {
    const getText = req.body.searchText;
    const x = getText;
    console.log(x);
    const searchCategory = await RentEvtol.find({ $text: { $search: x } });

    let getRentSearch = searchCategory;
    res.status(200).json({
      status: "success",
      getRentSearch,
    });
  } catch (error) {
    res.status(404).json({
      message: "Unable to display Rent Evtol",
      error: error.message,
    });
  }
};

// module.exports = router;
