const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const CryptoJS = require("crypto-js");

const dataBase = require("../models");
const { createNotification } = require("./notifications");

const FinancialEmergenciesDB = dataBase.UserFinancialEmergencies;
const MedicalEmergenciesDB = dataBase.UserMedicalEmergencies;

exports.saveFinancialEmergencyPoa = async (req, res) => {
  try {
    const userId = req.user.id;
    const { value, uploadType } = req.body;

    const encrypt = (text) =>
      text
        ? CryptoJS.AES.encrypt(text, process.env.CRYPTO_SECRET).toString()
        : "";

    const encryptedUrl = encrypt(value || "");

    let record = await FinancialEmergenciesDB.findOne({ where: { userId } });

    if (record) {
      await record.update({
        poa_text: "",
        poa_url: encryptedUrl || "text",
      });
    } else {
      record = await FinancialEmergenciesDB.create({
        userId,
        poa_text: "",
        poa_url: encryptedUrl || "text",
      });
    }

    await createNotification(
      userId,
      "Financial POA Saved.",
      "Your Financial Power of Attorney has been saved."
    );

    return res.status(200).json({ success: true, financialEmergency: record });
  } catch (error) {
    console.error("Error saving Financial POA:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
exports.saveMedicalEmergencyPoa = async (req, res) => {
  try {
    const userId = req.user.id;
    const { value, uploadType } = req.body;

    const encrypt = (text) =>
      text
        ? CryptoJS.AES.encrypt(text, process.env.CRYPTO_SECRET).toString()
        : "";

    const encryptedUrl = encrypt(value || "");

    let record = await MedicalEmergenciesDB.findOne({ where: { userId } });

    if (record) {
      await record.update({
        poa_text: "",
        poa_url: encryptedUrl || "text",
      });
    } else {
      record = await MedicalEmergenciesDB.create({
        userId,
        poa_text: "",
        poa_url: encryptedUrl || "text",
      });
    }

    await createNotification(
      userId,
      "Medical POA Saved.",
      "Your Financial Power of Attorney has been saved."
    );

    return res.status(200).json({ success: true, financialEmergency: record });
  } catch (error) {
    console.error("Error saving Financial POA:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
