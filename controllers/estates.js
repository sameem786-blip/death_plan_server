const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const CryptoJS = require("crypto-js");

const dataBase = require("../models");
const { createNotification } = require("./notifications");

const UserDB = dataBase.Users;
const NotificationDB = dataBase.Notifications;
const EstatesDB = dataBase.UserEstates;

// POST /estates/save/step
exports.saveLandRealEstate = async (req, res) => {
  try {
    const userId = req.user.id;
    const data = req.body;

    const encrypt = (text) =>
      text
        ? CryptoJS.AES.encrypt(text, process.env.CRYPTO_SECRET).toString()
        : "";

    const estates = await EstatesDB.findOne({ where: { userId } });

    const updates = {};
    const [stepName] = Object.keys(data);
    const { value, uploadType } = data[stepName];

    const stepKeyMap = {
      "Land & Real Estate": "landRealEstate",
      Vehicles: "vehicles",
      "Jewelry, Family Heirlooms, Artwork, Collectibles": "collectibles",
      "Checking, Savings, & Retirement Accounts": "accounts",
      "Insurance Policies": "policies",
      "Business Interests": "interests",
      "Stocks & Bonds": "stockBonds",
      "Debts & Obligations": "obligations",
      "People & Pets I Care For": "peoplePets",
    };

    const key = stepKeyMap[stepName];
    updates[`${key}_text`] = encrypt(value);
    updates[`${key}_uploadType`] = uploadType;

    let estate;
    if (estates) {
      estate = await estates.update(updates);
    } else {
      estate = await EstatesDB.create({
        userId,
        ...updates,
      });
    }

    return res.status(200).json({ success: true, estates: estate });
  } catch (error) {
    console.error("Error saving estate step:", error);
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
