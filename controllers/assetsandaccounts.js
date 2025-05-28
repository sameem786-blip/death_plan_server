const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const CryptoJS = require("crypto-js");

const dataBase = require("../models");
const { createNotification } = require("./notifications");

const AssetsAndAccountsDB = dataBase.UserAssetsAndAccounts;

exports.saveAssetsAndAccounts = async (req, res) => {
  try {
    const userId = req.user.id;
    const data = req.body;

    const encrypt = (text) =>
      text
        ? CryptoJS.AES.encrypt(text, process.env.CRYPTO_SECRET).toString()
        : "";

    const stepMap = {
      "My Death Plan™ Storage": "myDeathPlan",
      "Online Banking": "onlineBanking",
      "Social Media Accounts": "socialMediaAccounts",
      "NFT & Cryptocurrency": "nftAndCryptoCurrency",
      "Airline & Hotel Rewards Programs": "airlineAndHotelRewardsProgram",
      "Blogs & Video Channels": "blogsAndVideoChannel",
      "Domain Names": "domainNames",
      "Subscription Services (books, music, etc.)": "subscriptionServices",
      "Electronic Storage": "electronicStorage",
    };

    const [key] = Object.keys(data);
    const field = stepMap[key];
    const value = data[key]?.value || "";
    const uploadType = data[key]?.uploadType || "";

    let record = await AssetsAndAccountsDB.findOne({ where: { userId } });

    const updateData = {
      [`${field}_text`]: encrypt(value),
      [`${field}_uploadType`]: uploadType,
    };

    if (record) {
      await record.update(updateData);
    } else {
      record = await AssetsAndAccountsDB.create({
        userId,
        ...updateData,
      });
    }

    await createNotification(
      userId,
      `${key} Saved`,
      `Your ${key} record has been updated.`
    );

    return res.status(200).json({ success: true, assetsandaccounts: record });
  } catch (error) {
    console.error("Error saving Assets & Accounts step:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
