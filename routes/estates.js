const express = require("express");
const router = express.Router();

const EstateController = require("../controllers/estates");
const authMiddleware = require("../middlewares/checkAuth");

router.post(
  "/save/landRealEstate",
  authMiddleware,
  EstateController.saveLandRealEstate
);

module.exports = router;
