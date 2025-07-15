"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class UserDebts extends Model {
    static associate(models) {
      UserDebts.belongsTo(models.Users, { foreignKey: "userId" });
    }
  }

  UserDebts.init(
    {
      userId: DataTypes.INTEGER,
      insured: DataTypes.BOOLEAN,
      creditorPhone: DataTypes.STRING,
      creditorName: DataTypes.STRING,
      creditorAddress: DataTypes.STRING,
      creditorAccountNumber: DataTypes.STRING,
      paymentAmount: DataTypes.STRING,
      balance: DataTypes.STRING,
      dueDate: DataTypes.DATEONLY,
      text: DataTypes.TEXT,
      uploadType: DataTypes.TEXT,
      value: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: "UserDebts",
      tableName: "UserDebts",
    }
  );

  return UserDebts;
};
