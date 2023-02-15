const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const medicationSchema = new Schema({
  name: { type: String, required: true, match: /^[a-zA-Z0-9-_]+$/ },
  weight: { type: Number, required: true },
  code: { type: String, required: true, match: /^[A-Z0-9_]+$/ },
  image: { type: String, required: true },
});

module.exports = mongoose.model("Medication", medicationSchema);
