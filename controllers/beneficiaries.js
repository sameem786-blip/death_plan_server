const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const dataBase = require("../models");
const { createNotification } = require("./notifications");

const BeneficiaryDB = dataBase.Beneficiaries;
const UserDB = dataBase.Users;
const NotificationDB = dataBase.Notifications;
const CryptoJS = require("crypto-js");
const userdebts = require("../models/userdebts");

exports.createBeneficiaries = async (req, res) => {
  try {
    const userId = req.user.id;
    console.log("body", req.body);
    const user = await UserDB.findOne({
      where: { id: userId },
    });

    // Delete existing entries
    await BeneficiaryDB.destroy({ where: { userId } });

    const encrypt = (text) =>
      CryptoJS.AES.encrypt(text, process.env.CRYPTO_SECRET).toString();

    const beneficiary1 = {
      userId,
      fullName: encrypt(req.body.beneficiary1.fullName),
      email: encrypt(req.body.beneficiary1.email),
      contact: encrypt(req.body.beneficiary1.contact),
      relationShip: encrypt(req.body.beneficiary1.relationship),
    };

    const beneficiary2 = {
      userId,
      fullName: encrypt(req.body.beneficiary2.fullName),
      email: encrypt(req.body.beneficiary2.email),
      contact: encrypt(req.body.beneficiary2.contact),
      relationShip: encrypt(req.body.beneficiary2.relationship),
    };

    await BeneficiaryDB.bulkCreate([beneficiary1, beneficiary2]);

    user.isWillStarted = true;
    await user.save();

    return res.status(200).json("Beneficiaries created successfully.");
  } catch (error) {
    console.error(error);
    return res.status(500).json("Internal Server Error");
  }
};
