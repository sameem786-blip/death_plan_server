const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const CryptoJS = require("crypto-js");

const dataBase = require("../models");
const { createNotification } = require("./notifications");

const MedicalEmergenciesDB = dataBase.UserMedicalEmergencies;

exports.saveMedicalEmergency = async (req, res) => {
  try {
    const userId = req.user.id;
    const data = req.body;

    await MedicalEmergenciesDB.destroy({
      where: { userId },
    });

    const encrypt = (text) =>
      text
        ? CryptoJS.AES.encrypt(text, process.env.CRYPTO_SECRET).toString()
        : "";

    const medicalEmergency = await MedicalEmergenciesDB.create({
      userId,

      advancedHealthcareDirective_text: encrypt(
        data["Advanced Healthcare Directive (Living Will)"]?.value
      ),
      advancedHealthcareDirective_uploadType:
        data["Advanced Healthcare Directive (Living Will)"]?.uploadType || "",

      healthcarePowerOfAttorney_text: encrypt(
        data["Healthcare Power of Attorney"]?.value
      ),
      healthcarePowerOfAttorney_uploadType:
        data["Healthcare Power of Attorney"]?.uploadType || "",

      hIPPAAuthorization_text: encrypt(data["HIPPA Authorization"]?.value),
      hIPPAAuthorization_uploadType:
        data["HIPPA Authorization"]?.uploadType || "",

      doNotResuscitateOrder_text: encrypt(
        data["Do Not Resuscitate (DNR) Order"]?.value
      ),
      doNotResuscitateOrder_uploadType:
        data["Do Not Resuscitate (DNR) Order"]?.uploadType || "",
    });

    await createNotification(
      userId,
      "Medical Emergencies Saved.",
      "Your Medical Emergencies data has been saved."
    );

    return res
      .status(200)
      .json({ success: true, medicalEmergency: medicalEmergency });
  } catch (error) {
    console.error("Error saving Medical Emergencies:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
