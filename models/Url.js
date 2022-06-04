const { Schema, model } = require("mongoose");
const { addYears } = require("../utilities");

const urlSchema = new Schema({
  code: String,
  link: String,
  creationDate: { type: String, default: Date },
  expirationDate: { type: String, default: () => addYears(4) },
  inactiveDate: { type: String, default: () => addYears(2) },
});

module.exports = model("Url", urlSchema);
