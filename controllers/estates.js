const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const CryptoJS = require("crypto-js");

const dataBase = require("../models");
const { createNotification } = require("./notifications");

const UserDB = dataBase.Users;
const NotificationDB = dataBase.Notifications;
const EstatesDB = dataBase.UserEstates;

exports.saveLandRealEstate = async (req, res) => {
  try {
    const userId = req.user.id;
    const data = req.body;

    await EstatesDB.destroy({
      where: { userId },
    });

    const encrypt = (text) =>
      text
        ? CryptoJS.AES.encrypt(text, process.env.CRYPTO_SECRET).toString()
        : "";

    const estate = await EstatesDB.create({
      userId,

      landRealEstate_text: encrypt(data["Land & Real Estate"]?.value),
      landRealEstate_uploadType: data["Land & Real Estate"]?.uploadType || "",

      vehicles_text: encrypt(data["Vehicles"]?.value),
      vehicles_uploadType: data["Vehicles"]?.uploadType || "",

      collectibles_text: encrypt(
        data["Jewelry, Family Heirlooms, Artwork, Collectibles"]?.value
      ),
      collectibles_uploadType:
        data["Jewelry, Family Heirlooms, Artwork, Collectibles"]?.uploadType ||
        "",

      accounts_text: encrypt(
        data["Checking, Savings, & Retirement Accounts"]?.value
      ),
      accounts_uploadType:
        data["Checking, Savings, & Retirement Accounts"]?.uploadType || "",

      policies_text: encrypt(data["Insurance Policies"]?.value),
      policies_uploadType: data["Insurance Policies"]?.uploadType || "",

      interests_text: encrypt(data["Business Interests"]?.value),
      interests_uploadType: data["Business Interests"]?.uploadType || "",

      stockBonds_text: encrypt(data["Stocks & Bonds"]?.value),
      stockBonds_uploadType: data["Stocks & Bonds"]?.uploadType || "",

      obligations_text: encrypt(data["Debts & Obligations"]?.value),
      obligations_uploadType: data["Debts & Obligations"]?.uploadType || "",

      peoplePets_text: encrypt(data["People & Pets I Care For"]?.value),
      peoplePets_uploadType: data["People & Pets I Care For"]?.uploadType || "",
    });

    await createNotification(
      userId,
      "Real Estate Saved.",
      "Your real estate data has been saved."
    );

    return res.status(200).json({ success: true, estates: estate });
  } catch (error) {
    console.error("Error saving land real estate:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.saveVehicleRealEstate = async (req, res) => {
  try {
    const userId = req.user.id;

    const results = [];

    for (const estate of req.body) {
      console.log("Estate", estate);
      if (estate.id) {
        const existing = await VehicleRealEstateEstateDB.findOne({
          where: { id: estate.id, userId },
        });

        if (existing) {
          await existing.update({
            title: CryptoJS.AES.encrypt(
              estate.title,
              process.env.CRYPTO_SECRET
            ).toString(),
            description: CryptoJS.AES.encrypt(
              estate.description,
              process.env.CRYPTO_SECRET
            ).toString(),
            value: CryptoJS.AES.encrypt(
              estate.value.value,
              process.env.CRYPTO_SECRET
            ).toString(),
          });
          results.push(existing);
        } else {
          // ID provided but no match — treat as new creation
          const created = await VehicleRealEstateEstateDB.create({
            userId,
            title: CryptoJS.AES.encrypt(
              estate.title,
              process.env.CRYPTO_SECRET
            ).toString(),
            description: CryptoJS.AES.encrypt(
              estate.description,
              process.env.CRYPTO_SECRET
            ).toString(),
            value: CryptoJS.AES.encrypt(
              estate.value.value,
              process.env.CRYPTO_SECRET
            ).toString(),
          });
          results.push(created);
        }
      } else {
        // No ID — create new
        const created = await VehicleRealEstateEstateDB.create({
          userId,
          title: CryptoJS.AES.encrypt(
            estate.title,
            process.env.CRYPTO_SECRET
          ).toString(),
          description: CryptoJS.AES.encrypt(
            estate.description,
            process.env.CRYPTO_SECRET
          ).toString(),
          value: CryptoJS.AES.encrypt(
            estate.value.value,
            process.env.CRYPTO_SECRET
          ).toString(),
        });
        results.push(created);
      }
    }

    await createNotification(
      req.user.id,
      "Vehicle Estate Saved.",
      "You vehicle estate data has been saved."
    );

    return res.status(200).json({ success: true, estates: results });
  } catch (error) {
    console.error("Error saving land real estate:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
