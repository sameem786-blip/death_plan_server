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
