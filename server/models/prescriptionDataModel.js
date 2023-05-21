const mongoose = require("mongoose");
const mongoose_delete = require("mongoose-delete");

const prescriptionDataSchema = new mongoose.Schema({
  prescriptionID: { type: String, required: true },
  patientName: { type: String, required: true },
  patientID: { type: String, required: true },
  dateOfBirth: { type: Date, required: true },
  datePrescribed: { type: Date, required: true },
  physicianName: { type: String, required: true },
  clinicName: { type: String },
  prescriptionImage: { type: String, required: true },
  status: {
    type: String,
    enum: ["Preparing", "Ready", "Completed"],
    required: true,
  },
});

prescriptionDataSchema.plugin(mongoose_delete);

module.exports = mongoose.model("PrescriptionData", prescriptionDataSchema);
