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

    await AssetsAndAccountsDB.destroy({
      where: { userId },
    });

    const encrypt = (text) =>
      text
        ? CryptoJS.AES.encrypt(text, process.env.CRYPTO_SECRET).toString()
        : "";

    const assetsandaccounts = await AssetsAndAccountsDB.create({
      userId,

      myDeathPlan_text: encrypt(data["My Death Plan™ Storage"]?.value),
      myDeathPlan_uploadType: data["My Death Plan™ Storage"]?.uploadType || "",

      onlineBanking_text: encrypt(data["Online Banking"]?.value),
      onlineBanking_uploadType: data["Online Banking"]?.uploadType || "",

      socialMediaAccounts_text: encrypt(data["Social Media Accounts"]?.value),
      socialMediaAccounts_uploadType:
        data["Social Media Accounts"]?.uploadType || "",

      nftAndCryptoCurrency_text: encrypt(data["NFT & Cryptocurrency"]?.value),
      nftAndCryptoCurrency_uploadType:
        data["NFT & Cryptocurrency"]?.uploadType || "",
      airlineAndHotelRewardsProgram_text: encrypt(
        data["Airline & Hotel Rewards Programs"]?.value
      ),
      airlineAndHotelRewardsProgram_uploadType:
        data["Airline & Hotel Rewards Programs"]?.uploadType || "",
      blogsAndVideoChannel_text: encrypt(data["Blogs & Video Channels"]?.value),
      blogsAndVideoChannel_uploadType:
        data["Blogs & Video Channels"]?.uploadType || "",
      domainNames_text: encrypt(data["Domain Names"]?.value),
      domainNames_uploadType: data["Domain Names"]?.uploadType || "",
      subscriptionServices_text: encrypt(
        data["Subscription Services (books, music, etc.)"]?.value
      ),
      subscriptionServices_uploadType:
        data["Subscription Services (books, music, etc.)"]?.uploadType || "",
      electronicStorage_text: encrypt(data["Electronic Storage"]?.value),
      electronicStorage_uploadType:
        data["Electronic Storage"]?.uploadType || "",
    });

    await createNotification(
      userId,
      "Medical Emergencies Saved.",
      "Your Medical Emergencies data has been saved."
    );

    return res
      .status(200)
      .json({ success: true, assetsandaccounts: assetsandaccounts });
  } catch (error) {
    console.error("Error saving Medical Emergencies:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
