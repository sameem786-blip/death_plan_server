const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const dataBase = require("../models");
const { createNotification } = require("./notifications");
const { RolesAnywhere } = require("aws-sdk");

const UserDB = dataBase.Users;
const PackageDB = dataBase.Packages;
const SubscriptionDB = dataBase.Subscriptions;
const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY);

exports.subscribeToFreePackage = async (req, res) => {
  try {
    const user = await UserDB.findOne({
      where: {
        id: req.user.id,
      },
    });

    const package = PackageDB.findOne({
      where: {
        packageCost: "0",
      },
    });

    await SubscriptionDB.create({
      userId: user.id,
      packageId: package.id,
    });

    return res.status(200).json("Susbcribed to free plan");
  } catch (error) {
    console.log("Error during signup", error);
    return res.status(500).json("Internal Server Error", error);
  }
};

exports.createPaymentIntent = async (req, res) => {
  try {
    const { userId, packageId } = req.body;

    console.log("zs", req.body);

    if (!userId || !packageId) {
      return res
        .status(400)
        .json({ message: "userId and packageId are required" });
    }

    const user = await UserDB.findOne({ where: { id: userId } });
    const selectedPackage = await PackageDB.findOne({
      where: { id: packageId },
    });

    if (!user || !selectedPackage) {
      return res.status(404).json({ message: "User or Package not found" });
    }

    // Step 1: Create Stripe Customer if needed
    let stripeCustomerId = user.stripeCustomerId;
    if (!stripeCustomerId) {
      const customer = await stripe.customers.create({
        email: user.email,
        name: user.fullName,
      });
      stripeCustomerId = customer.id;
      await user.update({ stripeCustomerId });
    }

    // // Step 2: Create Stripe Subscription using package's Stripe price ID
    // // Step 1: Create subscription
    // const subscription = await stripe.subscriptions.create({
    //   customer: stripeCustomerId,
    //   items: [{ price: selectedPackage.stripePriceId }],
    //   payment_behavior: "default_incomplete",
    //   collection_method: "charge_automatically",
    //   payment_settings: {
    //     save_default_payment_method: "on_subscription",
    //   },
    //   // ✅ DO NOT expand here
    // });

    // // Step 2: Manually fetch invoice with expanded payment_intent
    // const invoice = await stripe.invoices.retrieve(
    //   subscription.latest_invoice,
    //   {
    //     expand: ["payment_intent"],
    //   }
    // );

    // // Step 3: Get clientSecret
    // const clientSecret = invoice.payment_intent.client_secret;

    // Step 3: Persist Subscription Record
    await SubscriptionDB.create({
      userId,
      packageId,
    });

    return res.status(200).json("subscribed successfully.");
  } catch (error) {
    console.error("Stripe subscription error:", error);
    return res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

exports.subscribe = async (req, res) => {
  try {
    const user = await UserDB.findOne({ where: { id: req.body.userId } });
    const selectedPackage = await PackageDB.findOne({
      where: { id: req.body.packageId },
    });

    if (!user || !selectedPackage) {
      return res.status(404).json("User or Package not found");
    }

    // 1. Create Stripe customer if needed
    let stripeCustomerId = user.stripeCustomerId;

    if (!stripeCustomerId) {
      const customer = await stripe.customers.create({
        email: user.email,
        name: user.fullName,
      });

      stripeCustomerId = customer.id;

      // ✅ Persist to user record
      await user.update({ stripeCustomerId });
    }

    // 2. Create Stripe Subscription
    const subscription = await stripe.subscriptions.create({
      customer: stripeCustomerId,
      items: [{ price: selectedPackage.stripePackageId }],
      payment_behavior: "default_incomplete",
      payment_settings: { save_default_payment_method: "on_subscription" },
      expand: ["latest_invoice.payment_intent"],
    });

    // 3. Save to DB
    await SubscriptionDB.create({
      userId: user.id,
      packageId: selectedPackage.id,
    });

    const clientSecret =
      subscription.latest_invoice.payment_intent.client_secret;

    return res.status(200).json({ clientSecret });
  } catch (error) {
    console.log("Error subscription", error);
    return res.status(500).json("Internal Server Error");
  }
};
