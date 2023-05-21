const mongoose = require("mongoose");
const mongoose_delete = require("mongoose-delete");

const patientDataSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  dateOfBirth: { type: String, required: true },
  patientID: { type: String, required: true },
  gender: { type: String, required: true },
  address: { type: String },
  contactNumber: { type: String },
});

patientDataSchema.plugin(mongoose_delete);

module.exports = mongoose.model("PatientData", patientDataSchema);
