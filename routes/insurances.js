const express = require("express");
const router = express.Router();

const InsuranceController = require("../controllers/insurances");
const authMiddleware = require("../middlewares/checkAuth");

router.post("/save", authMiddleware, InsuranceController.saveInsurances);

module.exports = router;
