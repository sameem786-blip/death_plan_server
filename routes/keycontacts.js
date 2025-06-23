const express = require("express");
const router = express.Router();

const KeyContactsRoute = require("../controllers/keycontacts");
const authMiddleware = require("../middlewares/checkAuth");

router.post(
  "/legal-advisor/save",
  authMiddleware,
  KeyContactsRoute.saveLegalAdvisor
);
router.post("/church/save", authMiddleware, KeyContactsRoute.saveChurch);
router.post(
  "/financial-advisor/save",
  authMiddleware,
  KeyContactsRoute.saveFinancialAdvisor
);
router.post("/cemetery/save", authMiddleware, KeyContactsRoute.saveCemetary);
router.post(
  "/funeral-home/save",
  authMiddleware,
  KeyContactsRoute.saveFuneralHome
);
router.post(
  "/insurance-agent/save",
  authMiddleware,
  KeyContactsRoute.saveInsuranceAgent
);
router.post("/pastor/save", authMiddleware, KeyContactsRoute.savePastor);
router.post(
  "/beautician-barber/save",
  authMiddleware,
  KeyContactsRoute.saveBeauticianBarber
);

module.exports = router;
