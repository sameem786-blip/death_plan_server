const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const CryptoJS = require("crypto-js");

const dataBase = require("../models");
const { createNotification } = require("./notifications");

const KeyContactsDB = dataBase.UserKeyContacts;

exports.saveLegalAdvisor = async (req, res) => {
  try {
    const userId = req.user.id;
    const { contacts } = req.body;

    if (!Array.isArray(contacts)) {
      return res.status(400).json({ message: "Invalid payload format." });
    }

    const encrypt = (value) =>
      value
        ? CryptoJS.AES.encrypt(value, process.env.CRYPTO_SECRET).toString()
        : "";

    const encryptedSubModuleType = "legal_advisor";
    const encryptedData = encrypt(JSON.stringify(contacts));

    const existing = await KeyContactsDB.findOne({
      where: { userId, subModuleType: encryptedSubModuleType },
    });

    let result;
    if (existing) {
      result = await existing.update({ data: encryptedData });
    } else {
      result = await KeyContactsDB.create({
        userId,
        subModuleType: encryptedSubModuleType,
        data: encryptedData,
      });
    }

    await createNotification(
      userId,
      "Debts & Obligations Saved.",
      "Your debts and obligations information has been saved."
    );

    return res.status(200).json({ success: true, estate: result });
  } catch (error) {
    console.error("Error saving debts and obligations:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
exports.saveChurch = async (req, res) => {
  try {
    const userId = req.user.id;
    const { contacts } = req.body;

    if (!Array.isArray(contacts)) {
      return res.status(400).json({ message: "Invalid payload format." });
    }

    const encrypt = (value) =>
      value
        ? CryptoJS.AES.encrypt(value, process.env.CRYPTO_SECRET).toString()
        : "";

    const encryptedSubModuleType = "church";
    const encryptedData = encrypt(JSON.stringify(contacts));

    const existing = await KeyContactsDB.findOne({
      where: { userId, subModuleType: encryptedSubModuleType },
    });

    let result;
    if (existing) {
      result = await existing.update({ data: encryptedData });
    } else {
      result = await KeyContactsDB.create({
        userId,
        subModuleType: encryptedSubModuleType,
        data: encryptedData,
      });
    }

    await createNotification(
      userId,
      "Debts & Obligations Saved.",
      "Your debts and obligations information has been saved."
    );

    return res.status(200).json({ success: true, estate: result });
  } catch (error) {
    console.error("Error saving debts and obligations:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
exports.saveFinancialAdvisor = async (req, res) => {
  try {
    const userId = req.user.id;
    const { contacts } = req.body;

    if (!Array.isArray(contacts)) {
      return res.status(400).json({ message: "Invalid payload format." });
    }

    const encrypt = (value) =>
      value
        ? CryptoJS.AES.encrypt(value, process.env.CRYPTO_SECRET).toString()
        : "";

    const encryptedSubModuleType = "financial_advisor";
    const encryptedData = encrypt(JSON.stringify(contacts));

    const existing = await KeyContactsDB.findOne({
      where: { userId, subModuleType: encryptedSubModuleType },
    });

    let result;
    if (existing) {
      result = await existing.update({ data: encryptedData });
    } else {
      result = await KeyContactsDB.create({
        userId,
        subModuleType: encryptedSubModuleType,
        data: encryptedData,
      });
    }

    await createNotification(
      userId,
      "Financial Advisor Saved.",
      "Your debts and obligations information has been saved."
    );

    return res.status(200).json({ success: true, estate: result });
  } catch (error) {
    console.error("Error saving debts and obligations:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
exports.saveCemetary = async (req, res) => {
  try {
    const userId = req.user.id;
    const { contacts } = req.body;

    if (!Array.isArray(contacts)) {
      return res.status(400).json({ message: "Invalid payload format." });
    }

    const encrypt = (value) =>
      value
        ? CryptoJS.AES.encrypt(value, process.env.CRYPTO_SECRET).toString()
        : "";

    const encryptedSubModuleType = "cemetery";
    const encryptedData = encrypt(JSON.stringify(contacts));

    const existing = await KeyContactsDB.findOne({
      where: { userId, subModuleType: encryptedSubModuleType },
    });

    let result;
    if (existing) {
      result = await existing.update({ data: encryptedData });
    } else {
      result = await KeyContactsDB.create({
        userId,
        subModuleType: encryptedSubModuleType,
        data: encryptedData,
      });
    }

    await createNotification(
      userId,
      "Financial Advisor Saved.",
      "Your debts and obligations information has been saved."
    );

    return res.status(200).json({ success: true, estate: result });
  } catch (error) {
    console.error("Error saving debts and obligations:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
exports.saveFuneralHome = async (req, res) => {
  try {
    const userId = req.user.id;
    const { contacts } = req.body;

    if (!Array.isArray(contacts)) {
      return res.status(400).json({ message: "Invalid payload format." });
    }

    const encrypt = (value) =>
      value
        ? CryptoJS.AES.encrypt(value, process.env.CRYPTO_SECRET).toString()
        : "";

    const encryptedSubModuleType = "funeral_home";
    const encryptedData = encrypt(JSON.stringify(contacts));

    const existing = await KeyContactsDB.findOne({
      where: { userId, subModuleType: encryptedSubModuleType },
    });

    let result;
    if (existing) {
      result = await existing.update({ data: encryptedData });
    } else {
      result = await KeyContactsDB.create({
        userId,
        subModuleType: encryptedSubModuleType,
        data: encryptedData,
      });
    }

    await createNotification(
      userId,
      "Financial Advisor Saved.",
      "Your debts and obligations information has been saved."
    );

    return res.status(200).json({ success: true, estate: result });
  } catch (error) {
    console.error("Error saving debts and obligations:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
exports.saveInsuranceAgent = async (req, res) => {
  try {
    const userId = req.user.id;
    const { contacts } = req.body;

    if (!Array.isArray(contacts)) {
      return res.status(400).json({ message: "Invalid payload format." });
    }

    const encrypt = (value) =>
      value
        ? CryptoJS.AES.encrypt(value, process.env.CRYPTO_SECRET).toString()
        : "";

    const encryptedSubModuleType = "insurance_agent";
    const encryptedData = encrypt(JSON.stringify(contacts));

    const existing = await KeyContactsDB.findOne({
      where: { userId, subModuleType: encryptedSubModuleType },
    });

    let result;
    if (existing) {
      result = await existing.update({ data: encryptedData });
    } else {
      result = await KeyContactsDB.create({
        userId,
        subModuleType: encryptedSubModuleType,
        data: encryptedData,
      });
    }

    await createNotification(
      userId,
      "Financial Advisor Saved.",
      "Your debts and obligations information has been saved."
    );

    return res.status(200).json({ success: true, estate: result });
  } catch (error) {
    console.error("Error saving debts and obligations:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
exports.savePastor = async (req, res) => {
  try {
    const userId = req.user.id;
    const { contacts } = req.body;

    if (!Array.isArray(contacts)) {
      return res.status(400).json({ message: "Invalid payload format." });
    }

    const encrypt = (value) =>
      value
        ? CryptoJS.AES.encrypt(value, process.env.CRYPTO_SECRET).toString()
        : "";

    const encryptedSubModuleType = "pastor";
    const encryptedData = encrypt(JSON.stringify(contacts));

    const existing = await KeyContactsDB.findOne({
      where: { userId, subModuleType: encryptedSubModuleType },
    });

    let result;
    if (existing) {
      result = await existing.update({ data: encryptedData });
    } else {
      result = await KeyContactsDB.create({
        userId,
        subModuleType: encryptedSubModuleType,
        data: encryptedData,
      });
    }

    await createNotification(
      userId,
      "Financial Advisor Saved.",
      "Your debts and obligations information has been saved."
    );

    return res.status(200).json({ success: true, estate: result });
  } catch (error) {
    console.error("Error saving debts and obligations:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
exports.saveBeauticianBarber = async (req, res) => {
  try {
    const userId = req.user.id;
    const { contacts } = req.body;

    if (!Array.isArray(contacts)) {
      return res.status(400).json({ message: "Invalid payload format." });
    }

    const encrypt = (value) =>
      value
        ? CryptoJS.AES.encrypt(value, process.env.CRYPTO_SECRET).toString()
        : "";

    const encryptedSubModuleType = "beautician_barber";
    const encryptedData = encrypt(JSON.stringify(contacts));

    const existing = await KeyContactsDB.findOne({
      where: { userId, subModuleType: encryptedSubModuleType },
    });

    let result;
    if (existing) {
      result = await existing.update({ data: encryptedData });
    } else {
      result = await KeyContactsDB.create({
        userId,
        subModuleType: encryptedSubModuleType,
        data: encryptedData,
      });
    }

    await createNotification(
      userId,
      "Financial Advisor Saved.",
      "Your debts and obligations information has been saved."
    );

    return res.status(200).json({ success: true, estate: result });
  } catch (error) {
    console.error("Error saving debts and obligations:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.saveKeyContacts = async (req, res) => {
  try {
    const userId = req.user.id;
    const data = req.body;

    const encrypt = (text) =>
      text
        ? CryptoJS.AES.encrypt(text, process.env.CRYPTO_SECRET).toString()
        : "";

    const keyContacts = await KeyContactsDB.findOne({ where: { userId } });

    const updates = {};
    const [stepName] = Object.keys(data);
    const { value, uploadType } = data[stepName];

    const keyMap = {
      "LEGAL ADVISOR": "legalAdvisor",
      CHURCH: "church",
      "FINANCIAL ADVISOR": "financialAdvisor",
      CEMETARY: "cemetary",
      "FUNERAL HOME": "funeralHome",
      "INSURANCE AGENT": "insuranceAgent",
      PASTOR: "pastor",
      "BEAUTICIAN / BARBER": "beauticianBarber",
    };

    const key = keyMap[stepName];
    updates[`${key}_text`] = encrypt(value);
    updates[`${key}_uploadType`] = uploadType;

    let updated;
    if (keyContacts) {
      updated = await keyContacts.update(updates);
    } else {
      updated = await KeyContactsDB.create({
        userId,
        ...updates,
      });
    }

    await createNotification(
      userId,
      "Key Contacts Saved.",
      "Your Key Contacts data has been saved."
    );

    return res.status(200).json({ success: true, keycontacts: updated });
  } catch (error) {
    console.error("Error saving key contacts:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
