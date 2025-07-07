const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const CryptoJS = require("crypto-js");

const dataBase = require("../models");
const { createNotification } = require("./notifications");

const ObituaryDB = dataBase.UserObituaries;

exports.savePreferences = async (req, res) => {
  try {
    const userId = req.user.id;
    const { preferences } = req.body;

    const encrypt = (value) =>
      value
        ? CryptoJS.AES.encrypt(
            JSON.stringify(value),
            process.env.CRYPTO_SECRET
          ).toString()
        : "";

    const encryptedPreferences = encrypt(preferences);
    const encryptedSubModuleType = "burial_preferences";

    let record = await ObituaryDB.findOne({
      where: { userId, subModuleType: encryptedSubModuleType },
    });

    if (record) {
      await record.update({
        data: encryptedPreferences,
      });
    } else {
      record = await ObituaryDB.create({
        userId,
        subModuleType: encryptedSubModuleType,
        data: encryptedPreferences,
      });
    }

    await createNotification(
      userId,
      "Burial Preferences Saved",
      "Your burial and obituary preferences have been saved successfully."
    );

    return res.status(200).json({ success: true, obituary: record });
  } catch (error) {
    console.error("Error saving burial preferences:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
// controllers/obituaryController.js

exports.saveObituary = async (req, res) => {
  try {
    const userId = req.user?.id;
    const { story, uploadType, value } = req.body;

    if (!userId || (!story && !value)) {
      return res
        .status(400)
        .json({ message: "Missing user or obituary content." });
    }

    const encrypt = (data) =>
      data
        ? CryptoJS.AES.encrypt(
            JSON.stringify(data),
            process.env.CRYPTO_SECRET
          ).toString()
        : "";

    const encryptedData = encrypt({ story, uploadType, value });
    const encryptedSubModuleType = "obituary";

    let record = await ObituaryDB.findOne({
      where: { userId, subModuleType: encryptedSubModuleType },
    });

    if (record) {
      await record.update({ data: encryptedData });
    } else {
      record = await ObituaryDB.create({
        userId,
        subModuleType: encryptedSubModuleType,
        data: encryptedData,
      });
    }

    await createNotification(
      userId,
      "Obituary Saved",
      "Your obituary has been saved successfully."
    );

    return res.status(200).json({ success: true, obituary: record });
  } catch (error) {
    console.error("Error saving obituary:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
