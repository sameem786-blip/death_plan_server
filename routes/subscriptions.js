const express = require("express");
const router = express.Router();

const SubscriptionsController = require("../controllers/subscriptions");
const checkAuth = require("../middlewares/checkAuth");

router.post(
  "/stripewebhook",
  express.raw({ type: "application/json" }),
  SubscriptionsController.stripeWebhookHandler
);

router.post(
  "/subscribeToFreePackage",
  checkAuth,
  SubscriptionsController.subscribeToFreePackage
);
router.post(
  "/subscribe",
  checkAuth,
  SubscriptionsController.createStripeSubscription
);
router.post(
  "/create-setup-intent",
  checkAuth,
  SubscriptionsController.createSetupIntent
);
router.post(
  "/save-payment-method",
  checkAuth,
  SubscriptionsController.savePaymentMethod
);

module.exports = router;
