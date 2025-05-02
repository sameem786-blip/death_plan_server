const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const CryptoJS = require("crypto-js");

const dataBase = require("../models");
const { createNotification } = require("./notifications");

const UserDB = dataBase.Users;
const NotificationDB = dataBase.Notifications;
const Land_RealEstate_EstateDB = dataBase.Land_RealEstate_Estates;

exports.saveLandRealEstate = async (req, res) => {
  try {
    const userId = req.user.id;

    const results = [];

    for (const estate of req.body) {
      console.log("Estate", estate);
      if (estate.id) {
        const existing = await Land_RealEstate_EstateDB.findOne({
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
          const created = await Land_RealEstate_EstateDB.create({
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
        const created = await Land_RealEstate_EstateDB.create({
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
      "Real Estate Saved.",
      "You real estate data has been saved."
    );

    return res.status(200).json({ success: true, estates: results });
  } catch (error) {
    console.error("Error saving land real estate:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
