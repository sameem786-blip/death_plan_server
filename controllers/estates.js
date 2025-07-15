const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const CryptoJS = require("crypto-js");

const dataBase = require("../models");
const { createNotification } = require("./notifications");

const UserDB = dataBase.Users;
const NotificationDB = dataBase.Notifications;
const EstatesDB = dataBase.UserRealEstates;

exports.saveLandRealEstate = async (req, res) => {
  try {
    const userId = req.user.id;
    const { properties } = req.body;

    if (!Array.isArray(properties)) {
      return res.status(400).json({ message: "Invalid data format." });
    }

    const encrypt = (value) =>
      value
        ? CryptoJS.AES.encrypt(value, process.env.CRYPTO_SECRET).toString()
        : "";

    const encryptedData = encrypt(JSON.stringify(properties));
    const subModuleTypePlain = "land_real_estate";

    const existing = await EstatesDB.findOne({
      where: { userId, subModuleType: subModuleTypePlain },
    });

    if (existing) {
      await EstatesDB.update(
        { data: encryptedData },
        { where: { id: existing.id } }
      );
    } else {
      await EstatesDB.create({
        userId,
        subModuleType: subModuleTypePlain,
        data: encryptedData,
      });
    }

    return res.status(200).json({
      success: true,
      message: existing ? "Property data updated." : "Property data saved.",
    });
  } catch (error) {
    console.error("Error saving land real estate:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.saveVehicleRealEstate = async (req, res) => {
  try {
    const userId = req.user.id;
    const { vehicles } = req.body;

    const encrypt = (value) =>
      value
        ? CryptoJS.AES.encrypt(value, process.env.CRYPTO_SECRET).toString()
        : "";

    const encryptedSubModuleType = "vehicles";
    const encryptedData = encrypt(JSON.stringify(vehicles));

    const existing = await EstatesDB.findOne({
      where: { userId, subModuleType: encryptedSubModuleType },
    });

    let result;

    if (existing) {
      result = await existing.update({ data: encryptedData });
    } else {
      result = await EstatesDB.create({
        userId,
        subModuleType: encryptedSubModuleType,
        data: encryptedData,
      });
    }

    await createNotification(
      userId,
      "Vehicle Estate Saved.",
      "Your vehicle estate data has been saved."
    );

    return res.status(200).json({ success: true, estate: result });
  } catch (error) {
    console.error("Error saving vehicle real estate:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.saveCollectablesEstate = async (req, res) => {
  try {
    const userId = req.user.id;
    const { collectables } = req.body;

    const encrypt = (value) =>
      value
        ? CryptoJS.AES.encrypt(value, process.env.CRYPTO_SECRET).toString()
        : "";

    const encryptedSubModuleType = "collectables";
    const encryptedData = encrypt(JSON.stringify(collectables));

    const existing = await EstatesDB.findOne({
      where: { userId, subModuleType: encryptedSubModuleType },
    });

    let result;

    if (existing) {
      result = await existing.update({ data: encryptedData });
    } else {
      result = await EstatesDB.create({
        userId,
        subModuleType: encryptedSubModuleType,
        data: encryptedData,
      });
    }

    await createNotification(
      userId,
      "Collectables Saved.",
      "Your collectables data has been saved."
    );

    return res.status(200).json({ success: true, estate: result });
  } catch (error) {
    console.error("Error saving collectables:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
exports.saveFinancialAccounts = async (req, res) => {
  try {
    const userId = req.user.id;
    const { accounts } = req.body;

    const encrypt = (value) =>
      value
        ? CryptoJS.AES.encrypt(value, process.env.CRYPTO_SECRET).toString()
        : "";

    const encryptedSubModuleType = "financial_accounts";
    const encryptedData = encrypt(JSON.stringify(accounts));

    const existing = await EstatesDB.findOne({
      where: { userId, subModuleType: encryptedSubModuleType },
    });

    let result;

    if (existing) {
      result = await existing.update({ data: encryptedData });
    } else {
      result = await EstatesDB.create({
        userId,
        subModuleType: encryptedSubModuleType,
        data: encryptedData,
      });
    }

    await createNotification(
      userId,
      "Financial Accounts Saved.",
      "Your financial accounts have been saved."
    );

    return res.status(200).json({ success: true, estate: result });
  } catch (error) {
    console.error("Error saving financial accounts:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.saveBusinessInterests = async (req, res) => {
  try {
    const userId = req.user.id;
    const { businesses } = req.body;

    const encrypt = (value) =>
      value
        ? CryptoJS.AES.encrypt(value, process.env.CRYPTO_SECRET).toString()
        : "";

    const encryptedSubModuleType = "business_interests";
    const encryptedData = encrypt(JSON.stringify(businesses));

    const existing = await EstatesDB.findOne({
      where: { userId, subModuleType: encryptedSubModuleType },
    });

    let result;

    if (existing) {
      result = await existing.update({ data: encryptedData });
    } else {
      result = await EstatesDB.create({
        userId,
        subModuleType: encryptedSubModuleType,
        data: encryptedData,
      });
    }

    await createNotification(
      userId,
      "Business Interests Saved.",
      "Your business interests have been saved."
    );

    return res.status(200).json({ success: true, estate: result });
  } catch (error) {
    console.error("Error saving business interests:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.saveStocksAndBonds = async (req, res) => {
  try {
    const userId = req.user.id;
    const { stocks } = req.body;

    const encrypt = (value) =>
      value
        ? CryptoJS.AES.encrypt(value, process.env.CRYPTO_SECRET).toString()
        : "";

    const encryptedSubModuleType = "stocks_bonds";
    const encryptedData = encrypt(JSON.stringify(stocks));

    const existing = await EstatesDB.findOne({
      where: { userId, subModuleType: encryptedSubModuleType },
    });

    let result;

    if (existing) {
      result = await existing.update({ data: encryptedData });
    } else {
      result = await EstatesDB.create({
        userId,
        subModuleType: encryptedSubModuleType,
        data: encryptedData,
      });
    }

    await createNotification(
      userId,
      "Stocks & Bonds Saved.",
      "Your stocks and bonds information has been saved."
    );

    return res.status(200).json({ success: true, estate: result });
  } catch (error) {
    console.error("Error saving stocks and bonds:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
exports.saveDebtsAndObligations = async (req, res) => {
  try {
    const userId = req.user.id;
    const { debts } = req.body;

    if (!Array.isArray(debts)) {
      return res.status(400).json({ message: "Invalid payload format." });
    }

    const encrypt = (value) =>
      value
        ? CryptoJS.AES.encrypt(value, process.env.CRYPTO_SECRET).toString()
        : "";

    const encryptedSubModuleType = "debts_obligations";
    const encryptedData = encrypt(JSON.stringify(debts));

    const existing = await EstatesDB.findOne({
      where: { userId, subModuleType: encryptedSubModuleType },
    });

    let result;
    if (existing) {
      result = await existing.update({ data: encryptedData });
    } else {
      result = await EstatesDB.create({
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
exports.saveOther = async (req, res) => {
  try {
    const userId = req.user.id;
    const { accounts } = req.body;

    const encrypt = (value) =>
      value
        ? CryptoJS.AES.encrypt(
            JSON.stringify(value),
            process.env.CRYPTO_SECRET
          ).toString()
        : "";

    const encryptedSubModuleType = "other_estates";
    const encryptedData = encrypt(accounts);

    const existing = await EstatesDB.findOne({
      where: { userId, subModuleType: encryptedSubModuleType },
    });

    let result;

    if (existing) {
      result = await existing.update({ data: encryptedData });
    } else {
      result = await EstatesDB.create({
        userId,
        subModuleType: encryptedSubModuleType,
        data: encryptedData,
      });
    }

    await createNotification(
      userId,
      "Other Digital Assets Saved",
      "Your other digital asset information has been successfully saved."
    );

    return res.status(200).json({ success: true, assets: result });
  } catch (error) {
    console.error("Error saving other digital assets:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
