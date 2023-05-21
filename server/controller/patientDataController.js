const PatientData = require("../models/patientDataModel");

// POST all patient data
// @route POST /patientData/uploadPatientData

const uploadPatientData = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      dateOfBirth,
      patientID,
      gender,
      address,
      contactNumber,
    } = req.body;

    if (!firstName || !lastName || !dateOfBirth || !patientID || !gender) {
      res.status(406).json({
        error: "Please add a text field",
      });
      return;
    }

    const patientData = await PatientData.create({
      firstName,
      lastName,
      dateOfBirth,
      patientID,
      gender,
      address,
      contactNumber,
    });

    res.status(201).json({
      message: "Patient data uploaded successfully",
      data: patientData,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET all patient data
// @route GET /patientData/getPatientData

const getPatientData = async (req, res) => {
  try {
    const patientData = await PatientData.find().sort({ patientID: 1 });

    res.status(200).json({
      message: "Patient data fetched successfully",
      data: patientData,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { uploadPatientData, getPatientData };
