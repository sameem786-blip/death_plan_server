"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class UserAssetsAndAccounts extends Model {
    static associate(models) {
      UserAssetsAndAccounts.belongsTo(models.Users, { foreignKey: "userId" });
    }
  }

  UserAssetsAndAccounts.init(
    {
      userId: DataTypes.INTEGER,
      subModuleType: DataTypes.STRING,
      data: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: "UserAssetsAndAccounts",
      tableName: "UserAssetsAndAccounts",
    }
  );

  return UserAssetsAndAccounts;
};
