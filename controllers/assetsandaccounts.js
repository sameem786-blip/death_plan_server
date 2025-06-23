const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const CryptoJS = require("crypto-js");

const dataBase = require("../models");
const { createNotification } = require("./notifications");

const AssetsAndAccountsDB = dataBase.UserAssetsAndAccounts;

exports.saveAssetsOnlineBanking = async (req, res) => {
  try {
    const userId = req.user.id;
    const { accounts } = req.body;

    const encrypt = (value) =>
      value
        ? CryptoJS.AES.encrypt(
            JSON.stringify(value),
            process.env.CRYPTO_SECRET
          ).toString()
        : "";

    const encryptedSubModuleType = "online_banking";
    const encryptedData = encrypt(accounts);

    const existing = await AssetsAndAccountsDB.findOne({
      where: { userId, subModuleType: encryptedSubModuleType },
    });

    let result;

    if (existing) {
      result = await existing.update({ data: encryptedData });
    } else {
      result = await AssetsAndAccountsDB.create({
        userId,
        subModuleType: encryptedSubModuleType,
        data: encryptedData,
      });
    }

    await createNotification(
      userId,
      "Online Banking Saved",
      "Your online banking information has been successfully saved."
    );

    return res.status(200).json({ success: true, assets: result });
  } catch (error) {
    console.error("Error saving online banking info:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
exports.saveSocialMediaAccounts = async (req, res) => {
  try {
    const userId = req.user.id;
    const { accounts } = req.body;

    const encrypt = (value) =>
      value
        ? CryptoJS.AES.encrypt(
            JSON.stringify(value),
            process.env.CRYPTO_SECRET
          ).toString()
        : "";

    const encryptedSubModuleType = "social_media_accounts";
    const encryptedData = encrypt(accounts);

    const existing = await AssetsAndAccountsDB.findOne({
      where: { userId, subModuleType: encryptedSubModuleType },
    });

    let result;

    if (existing) {
      result = await existing.update({ data: encryptedData });
    } else {
      result = await AssetsAndAccountsDB.create({
        userId,
        subModuleType: encryptedSubModuleType,
        data: encryptedData,
      });
    }

    await createNotification(
      userId,
      "Social Media Accounts Saved",
      "Your subscriptions and digital/social media account info has been saved."
    );

    return res.status(200).json({ success: true, assets: result });
  } catch (error) {
    console.error("Error saving social media accounts:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.saveNFTAndCryptocurrency = async (req, res) => {
  try {
    const userId = req.user.id;
    const { accounts } = req.body;

    const encrypt = (value) =>
      value
        ? CryptoJS.AES.encrypt(
            JSON.stringify(value),
            process.env.CRYPTO_SECRET
          ).toString()
        : "";

    const encryptedSubModuleType = "nft_crypto";
    const encryptedData = encrypt(accounts);

    const existing = await AssetsAndAccountsDB.findOne({
      where: { userId, subModuleType: encryptedSubModuleType },
    });

    let result;

    if (existing) {
      result = await existing.update({ data: encryptedData });
    } else {
      result = await AssetsAndAccountsDB.create({
        userId,
        subModuleType: encryptedSubModuleType,
        data: encryptedData,
      });
    }

    await createNotification(
      userId,
      "NFT & Crypto Accounts Saved",
      "Your NFT and cryptocurrency account information has been successfully saved."
    );

    return res.status(200).json({ success: true, assets: result });
  } catch (error) {
    console.error("Error saving NFT & Crypto accounts:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
exports.saveAirlineAndRewards = async (req, res) => {
  try {
    const userId = req.user.id;
    const { accounts } = req.body;

    const encrypt = (value) =>
      value
        ? CryptoJS.AES.encrypt(
            JSON.stringify(value),
            process.env.CRYPTO_SECRET
          ).toString()
        : "";

    const encryptedSubModuleType = "airline_rewards_accounts";
    const encryptedData = encrypt(accounts);

    const existing = await AssetsAndAccountsDB.findOne({
      where: { userId, subModuleType: encryptedSubModuleType },
    });

    let result;

    if (existing) {
      result = await existing.update({ data: encryptedData });
    } else {
      result = await AssetsAndAccountsDB.create({
        userId,
        subModuleType: encryptedSubModuleType,
        data: encryptedData,
      });
    }

    await createNotification(
      userId,
      "Airline & Rewards Saved",
      "Your airline miles and rewards account info has been saved."
    );

    return res.status(200).json({ success: true, assets: result });
  } catch (error) {
    console.error("Error saving airline & rewards accounts:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
exports.saveDomainNames = async (req, res) => {
  try {
    const userId = req.user.id;
    const { accounts } = req.body;

    const encrypt = (value) =>
      value
        ? CryptoJS.AES.encrypt(
            JSON.stringify(value),
            process.env.CRYPTO_SECRET
          ).toString()
        : "";

    const encryptedSubModuleType = "domain_names_accounts";
    const encryptedData = encrypt(accounts);

    const existing = await AssetsAndAccountsDB.findOne({
      where: { userId, subModuleType: encryptedSubModuleType },
    });

    let result;

    if (existing) {
      result = await existing.update({ data: encryptedData });
    } else {
      result = await AssetsAndAccountsDB.create({
        userId,
        subModuleType: encryptedSubModuleType,
        data: encryptedData,
      });
    }

    await createNotification(
      userId,
      "Domain Names Saved",
      "Your domain name account information has been successfully saved."
    );

    return res.status(200).json({ success: true, assets: result });
  } catch (error) {
    console.error("Error saving domain names:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
exports.saveSubscriptions = async (req, res) => {
  try {
    const userId = req.user.id;
    const { accounts } = req.body;

    const encrypt = (value) =>
      value
        ? CryptoJS.AES.encrypt(
            JSON.stringify(value),
            process.env.CRYPTO_SECRET
          ).toString()
        : "";

    const encryptedSubModuleType = "subscription_services";
    const encryptedData = encrypt(accounts);

    const existing = await AssetsAndAccountsDB.findOne({
      where: { userId, subModuleType: encryptedSubModuleType },
    });

    let result;

    if (existing) {
      result = await existing.update({ data: encryptedData });
    } else {
      result = await AssetsAndAccountsDB.create({
        userId,
        subModuleType: encryptedSubModuleType,
        data: encryptedData,
      });
    }

    await createNotification(
      userId,
      "Subscriptions Saved",
      "Your subscription service information has been successfully saved."
    );

    return res.status(200).json({ success: true, assets: result });
  } catch (error) {
    console.error("Error saving subscriptions:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
exports.saveEStorage = async (req, res) => {
  try {
    const userId = req.user.id;
    const { accounts } = req.body;

    const encrypt = (value) =>
      value
        ? CryptoJS.AES.encrypt(
            JSON.stringify(value),
            process.env.CRYPTO_SECRET
          ).toString()
        : "";

    const encryptedSubModuleType = "electronic_storage";
    const encryptedData = encrypt(accounts);

    const existing = await AssetsAndAccountsDB.findOne({
      where: { userId, subModuleType: encryptedSubModuleType },
    });

    let result;

    if (existing) {
      result = await existing.update({ data: encryptedData });
    } else {
      result = await AssetsAndAccountsDB.create({
        userId,
        subModuleType: encryptedSubModuleType,
        data: encryptedData,
      });
    }

    await createNotification(
      userId,
      "Electronic Storage Saved",
      "Your electronic storage account information has been successfully saved."
    );

    return res.status(200).json({ success: true, assets: result });
  } catch (error) {
    console.error("Error saving electronic storage:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
exports.saveOther = async (req, res) => {
  try {
    const userId = req.user.id;
    const { accounts } = req.body;

    const encrypt = (value) =>
      value
        ? CryptoJS.AES.encrypt(
            JSON.stringify(value),
            process.env.CRYPTO_SECRET
          ).toString()
        : "";

    const encryptedSubModuleType = "other_digital_assets";
    const encryptedData = encrypt(accounts);

    const existing = await AssetsAndAccountsDB.findOne({
      where: { userId, subModuleType: encryptedSubModuleType },
    });

    let result;

    if (existing) {
      result = await existing.update({ data: encryptedData });
    } else {
      result = await AssetsAndAccountsDB.create({
        userId,
        subModuleType: encryptedSubModuleType,
        data: encryptedData,
      });
    }

    await createNotification(
      userId,
      "Other Digital Assets Saved",
      "Your other digital asset information has been successfully saved."
    );

    return res.status(200).json({ success: true, assets: result });
  } catch (error) {
    console.error("Error saving other digital assets:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
