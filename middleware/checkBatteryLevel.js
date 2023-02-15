const checkBatteryLevel = (req, res, next) => {
  const { serialNumber, batteryCapacity } = req.body;
  eVTOL
    .findOne({ serialNumber })
    .then((eVTOL) => {
      if (eVTOL.batteryLevel < 0.25 * batteryCapacity) {
        return res.status(400).json({ msg: "Battery level too low" });
      }
      next();
    })
    .catch((err) => {
      res.status(400).json({ msg: "eVTOL not found" });
    });
};
