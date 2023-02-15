const checkWeightLimit = (req, res, next) => {
  const { weightLimit, medications } = req.body;
  let totalWeight = 0;
  medications.forEach((medication) => {
    totalWeight += medication.weight;
  });
  if (totalWeight > weightLimit) {
    return res.status(400).json({ msg: "Weight limit exceeded" });
  }
  next();
};
