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

    await InsuranceDB.destroy({
      where: { userId },
    });

    const encrypt = (text) =>
      text
        ? CryptoJS.AES.encrypt(text, process.env.CRYPTO_SECRET).toString()
        : "";

    const insurance = await InsuranceDB.create({
      userId,

      life_text: encrypt(data["Life"]?.value),
      life_uploadType: data["Life"]?.uploadType || "",

      liability_text: encrypt(data["Liability"]?.value),
      liability_uploadType: data["Liability"]?.uploadType || "",

      ltc_text: encrypt(data["Long-Term Care(LTC)"]?.value),
      ltc_uploadType: data["Long-Term Care(LTC)"]?.uploadType || "",

      ltd_text: encrypt(data["Long-Term Disability(LTD)"]?.value),
      ltd_uploadType: data["Long-Term Disability(LTD)"]?.uploadType || "",

      criticalIllness_text: encrypt(data["Critical Illness"]?.value),
      criticalIllness_uploadType: data["Critical Illness"]?.uploadType || "",

      credit_text: encrypt(data["Credit"]?.value),
      credit_uploadType: data["Credit"]?.uploadType || "",

      gap_text: encrypt(data["Guaranteed Asset Protection(GAP)"]?.value),
      gap_uploadType:
        data["Guaranteed Asset Protection(GAP)"]?.uploadType || "",

      pet_text: encrypt(data["Pet"]?.value),
      pet_uploadType: data["Pet"]?.uploadType || "",
    });

    await createNotification(
      userId,
      "Insurances Saved.",
      "Your real insurance data has been saved."
    );

    return res.status(200).json({ success: true, insurances: insurance });
  } catch (error) {
    console.error("Error saving land real estate:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
