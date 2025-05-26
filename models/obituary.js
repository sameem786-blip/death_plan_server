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
      obituary_uploadType: DataTypes.STRING,
      obituary_text: DataTypes.STRING,
      obituary_url: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "UserObituaries",
      tableName: "UserObituaries",
    }
  );

  return UserObituaries;
};
