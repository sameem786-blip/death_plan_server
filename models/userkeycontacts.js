"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class UserKeyContacts extends Model {
    static associate(models) {
      UserKeyContacts.belongsTo(models.Users, { foreignKey: "userId" });
    }
  }

  UserKeyContacts.init(
    {
      userId: DataTypes.INTEGER,
      subModuleType: DataTypes.STRING,
      data: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: "UserKeyContacts",
      tableName: "UserKeyContacts",
    }
  );

  return UserKeyContacts;
};
