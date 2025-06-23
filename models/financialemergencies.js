"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class UserFinancialEmergencies extends Model {
    static associate(models) {
      UserFinancialEmergencies.belongsTo(models.Users, {
        foreignKey: "userId",
      });
    }
  }

  UserFinancialEmergencies.init(
    {
      userId: DataTypes.INTEGER,
      poa_text: DataTypes.TEXT,
      poa_url: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: "UserFinancialEmergencies",
      tableName: "UserFinancialEmergencies",
    }
  );

  return UserFinancialEmergencies;
};
