const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();

const userRoutes = require("./routes/users");
const notificationRoutes = require("./routes/notifications");
const uploadRoutes = require("./routes/fileUpload");
const estatesRoute = require("./routes/estates");
const BeneficiariesRoute = require("./routes/beneficiaries");
const SubscriptionsRoute = require("./routes/subscriptions");
const DebtsRoute = require("./routes/debts");
const InsurancesRoute = require("./routes/insurances");
const MedicalEmergenciesRoute = require("./routes/medicalemergencies");
const AssetsAndAccountsRoute = require("./routes/assetsandaccounts");
const ObituaryRoutes = require("./routes/obituary");
const KeyContactsRoutes = require("./routes/keycontacts");

// const allowedOrigins = [
//   "http://localhost:5173", // local dev on PC
//   "http://192.168.18.9:5173", // replace with your PC's IP, e.g., "http://192.168.1.100:3000"
// ];

// app.use(
//   cors({
//     origin: allowedOrigins,
//     credentials: true,
//   })
// );

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api/user", userRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/estates", estatesRoute);
app.use("/api/debts", DebtsRoute);
app.use("/api/aws", uploadRoutes);
app.use("/api/beneficiaries", BeneficiariesRoute);
app.use("/api/subscriptions", SubscriptionsRoute);
app.use("/api/insurances", InsurancesRoute);
app.use("/api/medical-emergency", MedicalEmergenciesRoute);
app.use("/api/assets-and-accounts", AssetsAndAccountsRoute);
app.use("/api/obituary", ObituaryRoutes);
app.use("/api/keycontacts", KeyContactsRoutes);

app.get("/", (req, res) => res.send("Death Plan APIs is running!"));

module.exports = app;
