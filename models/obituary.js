"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class UserObituaries extends Model {
    static associate(models) {
      UserObituaries.belongsTo(models.Users, { foreignKey: "userId" });
    }
  }

  UserObituaries.init(
    {
      userId: DataTypes.INTEGER,
      subModuleType: DataTypes.STRING,
      data: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: "UserObituaries",
      tableName: "UserObituaries",
    }
  );

  return UserObituaries;
};
