const PrescriptionData = require("../models/prescriptionDataModel");
const mongoose = require("mongoose");

// POST all prescription data
// @route POST /prescriptionData/uploadPrescriptionData

const uploadPrescriptionData = async (req, res) => {
  try {
    const {
      prescriptionID,
      patientName,
      patientID,
      dateOfBirth,
      datePrescribed,
      physicianName,
      clinicName,
      prescriptionImage,
      status,
    } = req.body;

    if (
      !prescriptionID ||
      !physicianName ||
      !patientID ||
      !patientName ||
      !dateOfBirth ||
      !datePrescribed ||
      !prescriptionImage ||
      !status
    ) {
      res.status(406).json({
        error: "Please add a text field",
      });
      return;
    }

    const prescriptionData = await PrescriptionData.create({
      prescriptionID,
      physicianName,
      clinicName,
      patientID,
      patientName,
      dateOfBirth,
      datePrescribed,
      prescriptionImage,
      status,
    });

    res.status(201).json({
      message: "Prescription data uploaded successfully",
      data: prescriptionData,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET all prescription data
// @route GET /prescriptionData/getPrescriptionData

const getPrescriptionData = async (req, res) => {
  try {
    const prescriptionData = await PrescriptionData.find().sort({
      patientName: 1,
    });
    res.status(200).json({
      message: "Prescription data fetched successfully",
      data: prescriptionData,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// UPDATE prescription data..
// @route PATCH /prescriptionData/updateStatus/:id
const updatePrescriptionData = async (req, res) => {
  try {
    const updatedPrescriptionData = await PrescriptionData.findOneAndUpdate(
      { _id: req.params.id },
      { status: req.body.status },
      { new: true }
    );

    if (!updatedPrescriptionData) {
      res.status(404).json({
        error: "Prescription data not found",
      });
    }

    res.status(200).json({
      message: "Prescription data updated successfully",
      data: updatedPrescriptionData,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Soft DELETE prescription data..
// @route PATCH /prescriptionData/deletePrescriptionData/:id

const deletePrescriptionData = async (req, res) => {
  try {
    const deletedPrescriptionData = await PrescriptionData.findOneAndUpdate(
      { _id: req.params.id },
      { deleted: true },
      { new: true }
    );

    if (!deletedPrescriptionData) {
      res.status(404).json({
        error: "Prescription data not found",
        data: deletedPrescriptionData,
      });
    }

    res.status(200).json({
      message: "Prescription data deleted successfully",
      data: deletedPrescriptionData,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  uploadPrescriptionData,
  getPrescriptionData,
  updatePrescriptionData,
  deletePrescriptionData,
};
