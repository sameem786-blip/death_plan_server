const express = require("express");
const router = express.Router();

const BeneficiariesController = require("../controllers/beneficiaries");
const checkAuth = require("../middlewares/checkAuth");

router.post("/create", checkAuth, BeneficiariesController.createBeneficiaries);
router.post(
  "/create/setup",
  checkAuth,
  BeneficiariesController.createBeneficiariesSetup
);

module.exports = router;
