const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const CryptoJS = require("crypto-js");

const dataBase = require("../models");
const { createNotification } = require("./notifications");

const UserDB = dataBase.Users;
const NotificationDB = dataBase.Notifications;
const EstatesDB = dataBase.UserEstates;
const DebtsDB = dataBase.UserDebts;

exports.saveDebts = async (req, res) => {
  try {
    const userId = req.user.id;
    const data = req.body;

    console.log("User", data);

    await DebtsDB.destroy({
      where: { userId },
    });

    let debts = [];

    const encrypt = (text) =>
      text
        ? CryptoJS.AES.encrypt(text, process.env.CRYPTO_SECRET).toString()
        : "";
    for (const debt of data.debts) {
      const newDebt = await DebtsDB.create({
        userId: userId,
        creditorPhone: encrypt(debt.creditorPhone),
        creditorAddress: encrypt(debt.creditorAddress),
        creditorAccountNumber: encrypt(debt.accountNumbe),
        paymentAmount: encrypt(debt.paymentAmount),
        balance: encrypt(debt.balance),
        dueDate: debt.dueDate,
        insured: debt.creditInsured,
      });

      debts.push(newDebt);
    }

    await createNotification(
      userId,
      "Debts Saved.",
      "Your real debts data has been saved."
    );

    return res.status(200).json({ success: true, debts: debts });
  } catch (error) {
    console.error("Error saving debts:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
