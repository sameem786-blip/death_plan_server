const express = require("express");
const router = express.Router();

const SubscriptionsController = require("../controllers/subscriptions");
const checkAuth = require("../middlewares/checkAuth");

router.post(
  "/subscribeToFreePackage",
  checkAuth,
  SubscriptionsController.subscribeToFreePackage
);
router.post("/subscribe", checkAuth, SubscriptionsController.subscribe);
router.post(
  "/create-payment-intent",
  SubscriptionsController.createPaymentIntent
);

module.exports = router;
