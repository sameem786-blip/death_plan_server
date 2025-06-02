"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class TransactionHistories extends Model {
    static associate(models) {
      TransactionHistories.belongsTo(models.Users, { foreignKey: "userId" });
    }
  }

  TransactionHistories.init(
    {
      userId: DataTypes.INTEGER,
      stripeSubscriptionId: DataTypes.STRING,
      invoiceId: DataTypes.STRING,
      paymentIntentId: DataTypes.STRING,
      amount: DataTypes.DECIMAL,
      currency: DataTypes.STRING,
      status: DataTypes.STRING,
      billingReason: DataTypes.STRING,
      periodStart: DataTypes.DATE,
      periodEnd: DataTypes.DATE,
      paidAt: DataTypes.DATE,
      packageId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "TransactionHistories",
      tableName: "TransactionHistories",
    }
  );

  return TransactionHistories;
};
