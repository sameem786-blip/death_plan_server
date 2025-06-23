const express = require("express");
const router = express.Router();

const AssetsAndAccountsController = require("../controllers/assetsandaccounts");
const authMiddleware = require("../middlewares/checkAuth");

router.post(
  "/online-banking/save",
  authMiddleware,
  AssetsAndAccountsController.saveAssetsOnlineBanking
);
router.post(
  "/socialmediaaccounts/save",
  authMiddleware,
  AssetsAndAccountsController.saveSocialMediaAccounts
);
router.post(
  "/nftandcryptocurrency/save",
  authMiddleware,
  AssetsAndAccountsController.saveNFTAndCryptocurrency
);
router.post(
  "/airlineandrewards/save",
  authMiddleware,
  AssetsAndAccountsController.saveAirlineAndRewards
);
router.post(
  "/domain-names/save",
  authMiddleware,
  AssetsAndAccountsController.saveDomainNames
);
router.post(
  "/subscriptions/save",
  authMiddleware,
  AssetsAndAccountsController.saveSubscriptions
);
router.post(
  "/e-storage/save",
  authMiddleware,
  AssetsAndAccountsController.saveEStorage
);
router.post(
  "/other/save",
  authMiddleware,
  AssetsAndAccountsController.saveOther
);

module.exports = router;
