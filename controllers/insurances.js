const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const CryptoJS = require("crypto-js");

const dataBase = require("../models");
const { createNotification } = require("./notifications");

const UserDB = dataBase.Users;
const NotificationDB = dataBase.Notifications;
const EstatesDB = dataBase.UserEstates;
const InsuranceDB = dataBase.UserInsurances;

exports.saveInsurances = async (req, res) => {
  try {
    const userId = req.user.id;
    const data = req.body;

    const encrypt = (text) =>
      text
        ? CryptoJS.AES.encrypt(text, process.env.CRYPTO_SECRET).toString()
        : "";

    const stepMap = {
      Life: "life",
      Liability: "liability",
      "Long-Term Care(LTC)": "ltc",
      "Long-Term Disability(LTD)": "ltd",
      "Critical Illness": "criticalIllness",
      Credit: "credit",
      Pet: "pet",
      "Guaranteed Asset Protection(GAP)": "gap",
    };

    const [key] = Object.keys(data);
    const field = stepMap[key];
    const value = data[key]?.value || "";
    const uploadType = data[key]?.uploadType || "";

    let insurance = await InsuranceDB.findOne({ where: { userId } });

    const updateData = {
      [`${field}_text`]: encrypt(value),
      [`${field}_uploadType`]: uploadType,
    };

    if (insurance) {
      await insurance.update(updateData);
    } else {
      insurance = await InsuranceDB.create({
        userId,
        ...updateData,
      });
    }

    await createNotification(
      userId,
      `${key} Insurance Saved`,
      `Your ${key} insurance entry has been updated.`
    );

    return res.status(200).json({ success: true, insurances: insurance });
  } catch (error) {
    console.error("Error saving insurance step:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
