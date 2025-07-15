const CryptoJS = require("crypto-js");
const dataBase = require("../models");
const { createNotification } = require("./notifications");

const DebtsDB = dataBase.UserDebts;

exports.saveDebts = async (req, res) => {
  try {
    const userId = req.user.id;
    const data = req.body;

    await DebtsDB.destroy({ where: { userId } });

    const encrypt = (text) =>
      text
        ? CryptoJS.AES.encrypt(text, process.env.CRYPTO_SECRET).toString()
        : "";

    const debts = [];

    for (const debt of data.debts) {
      const newDebt = await DebtsDB.create({
        userId,
        creditorPhone: encrypt(debt.creditorPhone),
        creditorName: encrypt(debt.creditorName),
        creditorAddress: encrypt(debt.creditorAddress),
        creditorAccountNumber: encrypt(debt.accountNumber),
        paymentAmount: encrypt(debt.paymentAmount),
        balance: encrypt(debt.balance),
        dueDate: debt.dueDate || null,
        insured: debt.creditInsurance || false,
        text: encrypt(debt.text || ""),
        uploadType: debt.uploadType || "attachment",
        value: debt.value || "",
      });

      debts.push(newDebt);
    }

    await createNotification(
      userId,
      "Debts Saved.",
      "Your real debts data has been saved."
    );

    return res.status(200).json({ success: true, debts });
  } catch (error) {
    console.error("Error saving debts:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
