"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class UserRealEstates extends Model {
    static associate(models) {
      UserRealEstates.belongsTo(models.Users, { foreignKey: "userId" });
    }
  }

  UserRealEstates.init(
    {
      userId: DataTypes.INTEGER,
      subModuleType: DataTypes.STRING,
      data: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: "UserRealEstates",
      tableName: "UserRealEstates",
    }
  );

  return UserRealEstates;
};
