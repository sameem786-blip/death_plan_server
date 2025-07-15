const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const CryptoJS = require("crypto-js");

const dataBase = require("../models");
const { createNotification } = require("./notifications");

const UserDB = dataBase.Users;
const NotificationDB = dataBase.Notifications;
const EstatesDB = dataBase.UserRealEstates;
const InsuranceDB = dataBase.UserInsurances;

exports.saveInsurances = async (req, res) => {
  try {
    const userId = req.user.id;
    const { policies } = req.body;

    if (!Array.isArray(policies) || policies.length === 0) {
      return res
        .status(400)
        .json({ message: "No insurance policies provided" });
    }

    const encrypt = (text) =>
      text
        ? CryptoJS.AES.encrypt(text, process.env.CRYPTO_SECRET).toString()
        : "";

    await InsuranceDB.destroy({ where: { userId } });

    const enriched = policies.map((policy) => ({
      userId,
      policyType: encrypt(policy.policyType),
      insuranceCompany: encrypt(policy.insuranceCompany),
      policyNumber: encrypt(policy.policyNumber),
      beneficiary: encrypt(policy.beneficiary),
      uploadType: policy.uploadType || "attachment",
      value: policy.value || "",
    }));

    await InsuranceDB.bulkCreate(enriched);

    await createNotification(
      userId,
      "Insurance Policies Saved",
      "Your insurance policy records have been updated."
    );

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error("Error saving insurance policies:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
