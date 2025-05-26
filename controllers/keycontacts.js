const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const CryptoJS = require("crypto-js");

const dataBase = require("../models");
const { createNotification } = require("./notifications");

const KeyContactsDB = dataBase.UserKeyContacts;

exports.saveKeyContacts = async (req, res) => {
  try {
    const userId = req.user.id;
    const data = req.body;

    await KeyContactsDB.destroy({
      where: { userId },
    });

    const encrypt = (text) =>
      text
        ? CryptoJS.AES.encrypt(text, process.env.CRYPTO_SECRET).toString()
        : "";

    const keycontacts = await KeyContactsDB.create({
      userId,

      legalAdvisor_text: encrypt(data["LEGAL ADVISOR"]?.value),
      legalAdvisor_uploadType: data["LEGAL ADVISOR"]?.uploadType || "",

      church_text: encrypt(data["CHURCH"]?.value),
      church_uploadType: data["CHURCH"]?.uploadType || "",

      financialAdvisor_text: encrypt(data["FINANCIAL ADVISOR"]?.value),
      financialAdvisor_uploadType: data["FINANCIAL ADVISOR"]?.uploadType || "",

      cemetary_text: encrypt(data["CEMETARY"]?.value),
      cemetary_uploadType: data["CEMETARY"]?.uploadType || "",
      funeralHome_text: encrypt(data["FUNERAL HOME"]?.value),
      funeralHome_uploadType: data["FUNERAL HOME"]?.uploadType || "",
      insuranceAgent_text: encrypt(data["INSURANCE AGENT"]?.value),
      insuranceAgent_uploadType: data["INSURANCE AGENT"]?.uploadType || "",
      pastor_text: encrypt(data["PASTOR"]?.value),
      pastor_uploadType: data["PASTOR"]?.uploadType || "",
      beauticianBarber_text: encrypt(data["BEAUTICIAN / BARBER"]?.value),
      beauticianBarber_uploadType:
        data["BEAUTICIAN / BARBER"]?.uploadType || "",
    });

    await createNotification(
      userId,
      "Key Contacts Saved.",
      "Your Key Contacts data has been saved."
    );

    return res.status(200).json({ success: true, keycontacts: keycontacts });
  } catch (error) {
    console.error("Error saving Medical Emergencies:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
