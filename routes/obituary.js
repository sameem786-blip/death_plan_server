const express = require("express");
const router = express.Router();

const ObituaryController = require("../controllers/obituary");
const authMiddleware = require("../middlewares/checkAuth");

router.post("/save", authMiddleware, ObituaryController.saveAssetsAndAccounts);

module.exports = router;
