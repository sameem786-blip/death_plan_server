const express = require("express");
const router = express.Router();

const ObituaryController = require("../controllers/obituary");
const authMiddleware = require("../middlewares/checkAuth");

router.post(
  "/preferences/save",
  authMiddleware,
  ObituaryController.savePreferences
);
router.post("/obituary/save", authMiddleware, ObituaryController.saveObituary);

module.exports = router;
