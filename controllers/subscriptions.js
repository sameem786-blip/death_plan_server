const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const dataBase = require("../models");
const { createNotification } = require("./notifications");
const { RolesAnywhere } = require("aws-sdk");

const UserDB = dataBase.Users;
const PackageDB = dataBase.Packages;
const SubscriptionDB = dataBase.Subscriptions;
const TransactionsDB = dataBase.TransactionHistories;
const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY);

exports.subscribeToFreePackage = async (req, res) => {
  try {
    const user = await UserDB.findOne({
      where: {
        id: req.user.id,
      },
    });

    // const package = PackageDB.findOne({
    //   where: {
    //     packageLabel: "Free Plan",
    //   },
    // });

    await SubscriptionDB.create({
      userId: user.id,
      packageId: 1,
    });

    user.subscribed = true;
    await user.save();

    return res.status(200).json("Susbcribed to free plan");
  } catch (error) {
    console.log("Error during signup", error);
    return res.status(500).json("Internal Server Error", error);
  }
};

exports.createSetupIntent = async (req, res) => {
  try {
    const { userId } = req.body;

    if (!userId) {
      return res.status(400).json({ message: "userId is required" });
    }

    const user = await UserDB.findOne({ where: { id: userId } });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Step 1: Create Stripe Customer if needed
    let stripeCustomerId = user.stripeCustomerId;
    if (!stripeCustomerId) {
      const customer = await stripe.customers.create({
        email: user.email,
        name: `${user.firstName} ${user.lastName}`,
      });
      stripeCustomerId = customer.id;
      await user.update({ stripeCustomerId });
    }

    // Step 2: Create SetupIntent to collect card details
    const setupIntent = await stripe.setupIntents.create({
      customer: stripeCustomerId,
    });

    return res.status(200).json({
      clientSecret: setupIntent.client_secret,
    });
  } catch (error) {
    console.error("SetupIntent error:", error);
    return res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

exports.savePaymentMethod = async (req, res) => {
  try {
    const { userId, paymentMethodId } = req.body;

    if (!userId || !paymentMethodId) {
      return res.status(400).json({ message: "Missing fields" });
    }

    const user = await UserDB.findOne({ where: { id: userId } });

    if (!user || !user.stripeCustomerId) {
      return res.status(404).json({ message: "User or customer not found" });
    }

    // Attach payment method to customer
    await stripe.paymentMethods.attach(paymentMethodId, {
      customer: user.stripeCustomerId,
    });

    // Set as default payment method
    await stripe.customers.update(user.stripeCustomerId, {
      invoice_settings: {
        default_payment_method: paymentMethodId,
      },
    });

    return res
      .status(200)
      .json({ message: "Payment method saved successfully" });
  } catch (error) {
    console.error("Save payment method error:", error);
    return res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};

exports.createStripeSubscription = async (req, res) => {
  try {
    const { userId, packageId } = req.body;

    if (!userId || !packageId) {
      return res
        .status(400)
        .json({ message: "userId and packageId are required" });
    }

    const selectedPackage = await PackageDB.findOne({
      where: { id: packageId },
    });

    if (!selectedPackage || !selectedPackage.stripePriceId) {
      return res
        .status(404)
        .json({ message: "Package not found or missing Stripe price ID" });
    }

    const priceId = selectedPackage.stripePriceId;

    const user = await UserDB.findOne({ where: { id: userId } });

    if (!user || !user.stripeCustomerId) {
      return res
        .status(404)
        .json({ message: "User not found or missing Stripe customer ID" });
    }

    await stripe.subscriptions.create({
      customer: user.stripeCustomerId,
      items: [{ price: priceId }],
      default_payment_method: (
        await stripe.customers.retrieve(user.stripeCustomerId)
      ).invoice_settings.default_payment_method,
      metadata: {
        packageId: packageId,
        source: "deathplan-app",
      },
    });

    user.isWillStarted = true;
    user.subscribed = true;

    await user.save();

    return res.status(200).json({
      message: "Subscription created successfully",
    });
  } catch (error) {
    console.error("Stripe subscription error:", error);
    return res.status(500).json({
      message: "Failed to create subscription",
      error: error.message,
    });
  }
};

exports.stripeWebhookHandler = async (req, res) => {
  const sig = req.headers["stripe-signature"];
  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
  } catch (err) {
    console.error("⚠️ Webhook signature verification failed:", err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  const data = event.data.object;

  try {
    switch (event.type) {
      case "invoice.payment_succeeded": {
        const invoice = data;
        const customerId = invoice.customer;
        const subscription = event.data.object;
        console.log("DDD", subscription);
        const packageId = data.lines.data[0].metadata.packageId;

        console.log("zP", data);
        // 1. Find the user by Stripe customer ID
        const user = await UserDB.findOne({
          where: { stripeCustomerId: customerId },
        });
        if (!user) {
          console.warn("User not found for customer:", customerId);
          break;
        }

        // 3. Get the related package (optional, only if you want to track it)
        const pkg = await PackageDB.findOne({
          where: { id: packageId },
        });

        await SubscriptionDB.create({
          userId: user.id,
          packageId: pkg.id,
        });

        const subscriptionId = data.parent.subscription_details.subscription;

        // 4. Create Transaction History entry
        await TransactionsDB.create({
          userId: user.id,
          stripeSubscriptionId: subscriptionId,
          invoiceId: invoice.id,
          paymentIntentId: invoice.payment_intent || null,
          amount: invoice.amount_paid / 100,
          currency: invoice.currency,
          status: invoice.status,
          billingReason: invoice.billing_reason,
          periodStart: new Date(invoice.period_start * 1000),
          periodEnd: new Date(
            new Date(invoice.period_end * 1000).setFullYear(
              new Date(invoice.period_end * 1000).getFullYear() + 1
            )
          ),
          paidAt: new Date(invoice.status_transitions.paid_at * 1000),
          packageId: pkg?.id || null,
        });

        user.subscribed = true;
        await user.save();

        console.log(`✅ Transaction recorded for user ${user.email}`);
        break;
      }

      case "invoice.payment_failed":
        console.warn("❌ Payment failed:", data.id);
        // TODO: Notify user / retry logic
        break;

      case "customer.subscription.deleted":
        console.warn("❌ Subscription canceled:", data.id);
        // TODO: Set user.subscriptionStatus = "cancelled"
        break;

      case "customer.subscription.updated":
        console.log("🔁 Subscription updated:", data.id);
        // Optional: Update plan, status, etc.
        break;

      default:
        console.log(`Unhandled event type ${event.type}`);
    }

    res.status(200).json({ received: true });
  } catch (err) {
    console.error("Webhook error:", err);
    res.status(500).send("Internal error");
  }
};
