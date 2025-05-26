const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const CryptoJS = require("crypto-js");

const dataBase = require("../models");
const { createNotification } = require("./notifications");

const ObituaryDB = dataBase.UserObituaries;

exports.saveAssetsAndAccounts = async (req, res) => {
  try {
    const userId = req.user.id;
    const data = req.body;

    await ObituaryDB.destroy({
      where: { userId },
    });

    const encrypt = (text) =>
      text
        ? CryptoJS.AES.encrypt(text, process.env.CRYPTO_SECRET).toString()
        : "";

    const obituary = await ObituaryDB.create({
      userId,

      obituary_text: encrypt(data["Obituary"]?.value),
      obituary_uploadType: data["Obituary"]?.uploadType || "",
    });

    await createNotification(
      userId,
      "Obituary Saved.",
      "Your Obituary data has been saved."
    );

    return res.status(200).json({ success: true, obituary: obituary });
  } catch (error) {
    console.error("Error saving Medical Emergencies:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
