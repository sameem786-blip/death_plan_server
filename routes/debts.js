const express = require("express");
const router = express.Router();

const DebtsController = require("../controllers/debts");
const authMiddleware = require("../middlewares/checkAuth");

router.post("/save/debts", authMiddleware, DebtsController.saveDebts);

module.exports = router;
