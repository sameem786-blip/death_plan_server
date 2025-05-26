const express = require("express");
const router = express.Router();

const AssetsAndAccountsController = require("../controllers/assetsandaccounts");
const authMiddleware = require("../middlewares/checkAuth");

router.post(
  "/save",
  authMiddleware,
  AssetsAndAccountsController.saveAssetsAndAccounts
);

module.exports = router;
