const express = require("express");
const router = express.Router();

// ROUTINGS & CONTROLLERS

// PATIENT DATA Controller
const {
  uploadPatientData,
  getPatientData,
} = require("../controller/patientDataController.js");

// PATIENT DATA Routes
router
  .route("/medXpress/patientData/uploadPatientData")
  .post(uploadPatientData);
router.route("/medXpress/patientData").get(getPatientData);

// USER DATA Controller
const {
  uploadUserData,
  getUserData,
} = require("../controller/userDataController.js");

// USER DATA Routes
router.route("/medXpress/userData/register").post(uploadUserData);
router.route("/medXpress/userData").get(getUserData);

// PRESCRIPTION DATA Controller

const {
  uploadPrescriptionData,
  getPrescriptionData,
  updatePrescriptionData,
  deletePrescriptionData,
} = require("../controller/prescriptionDataController.js");

// PRESCRIPTION DATA Routes
router
  .route("/prescriptionData/uploadPrescriptionData")
  .post(uploadPrescriptionData);
router.route("/prescriptionData").get(getPrescriptionData);
router
  .route("/prescriptionData/updateStatus/:id")
  .patch(updatePrescriptionData);

router
  .route("/prescriptionData/archivePrescription/:id")
  .patch(deletePrescriptionData);

module.exports = router;
