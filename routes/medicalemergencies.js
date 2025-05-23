const express = require("express");
const router = express.Router();

const MedicalEmergencyController = require("../controllers/medicalemergencies");
const authMiddleware = require("../middlewares/checkAuth");

router.post(
  "/save",
  authMiddleware,
  MedicalEmergencyController.saveMedicalEmergency
);

module.exports = router;
