const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();

// Allow raw body only for Stripe webhook
app.use(
  "/api/subscriptions/stripewebhook",
  express.raw({ type: "application/json" })
);

// After raw body for webhook, add other middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use("/api/user", require("./routes/users"));
app.use("/api/notifications", require("./routes/notifications"));
app.use("/api/estates", require("./routes/estates"));
app.use("/api/aws", require("./routes/fileUpload"));
app.use("/api/beneficiaries", require("./routes/beneficiaries"));
app.use("/api/subscriptions", require("./routes/subscriptions"));
app.use("/api/debts", require("./routes/debts"));
app.use("/api/insurances", require("./routes/insurances"));
app.use("/api/medical-emergency", require("./routes/medicalemergencies"));
app.use("/api/assets-and-accounts", require("./routes/assetsandaccounts"));
app.use("/api/obituary", require("./routes/obituary"));
app.use("/api/keycontacts", require("./routes/keycontacts"));

app.get("/", (req, res) => res.send("Death Plan APIs is running!"));

module.exports = app;
