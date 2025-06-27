const express = require("express");
const router = express.Router();

const MedicalEmergencyController = require("../controllers/medicalemergencies");
const authMiddleware = require("../middlewares/checkAuth");

router.post(
  "/financialPOA/save",
  authMiddleware,
  MedicalEmergencyController.saveFinancialEmergencyPoa
);
router.post(
  "/save",
  authMiddleware,
  MedicalEmergencyController.saveMedicalEmergencyPoa
);

module.exports = router;
