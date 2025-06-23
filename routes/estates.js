const express = require("express");
const router = express.Router();

const EstateController = require("../controllers/estates");
const authMiddleware = require("../middlewares/checkAuth");

router.post(
  "/save/landRealEstate",
  authMiddleware,
  EstateController.saveLandRealEstate
);

router.post(
  "/save/vehicleRealEstate",
  authMiddleware,
  EstateController.saveVehicleRealEstate
);
router.post(
  "/save/collectables",
  authMiddleware,
  EstateController.saveCollectablesEstate
);
router.post(
  "/save/financialAccounts",
  authMiddleware,
  EstateController.saveFinancialAccounts
);
router.post(
  "/save/businessInterests",
  authMiddleware,
  EstateController.saveBusinessInterests
);
router.post(
  "/save/stocksBonds",
  authMiddleware,
  EstateController.saveStocksAndBonds
);
router.post(
  "/save/debtsObligations",
  authMiddleware,
  EstateController.saveDebtsAndObligations
);
router.post("/save/other", authMiddleware, EstateController.saveOther);

module.exports = router;
