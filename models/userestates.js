"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class UserEstates extends Model {
    static associate(models) {
      UserEstates.belongsTo(models.Users, { foreignKey: "userId" });
    }
  }

  UserEstates.init(
    {
      userId: DataTypes.INTEGER,
      landRealEstate_uploadType: DataTypes.STRING,
      landRealEstate_text: DataTypes.STRING,
      landRealEstate_url: DataTypes.STRING,
      vehicles_uploadType: DataTypes.STRING,
      vehicles_text: DataTypes.STRING,
      vehicles_url: DataTypes.STRING,
      collectibles_uploadType: DataTypes.STRING,
      collectibles_text: DataTypes.STRING,
      collectibles_url: DataTypes.STRING,
      accounts_uploadType: DataTypes.STRING,
      accounts_text: DataTypes.STRING,
      accounts_url: DataTypes.STRING,
      policies_uploadType: DataTypes.STRING,
      policies_text: DataTypes.STRING,
      policies_url: DataTypes.STRING,
      interests_uploadType: DataTypes.STRING,
      interests_text: DataTypes.STRING,
      interests_url: DataTypes.STRING,
      stockBonds_uploadType: DataTypes.STRING,
      stockBonds_text: DataTypes.STRING,
      stockBonds_url: DataTypes.STRING,
      obligations_uploadType: DataTypes.STRING,
      obligations_text: DataTypes.STRING,
      obligations_url: DataTypes.STRING,
      peoplePets_uploadType: DataTypes.STRING,
      peoplePets_text: DataTypes.STRING,
      peoplePets_url: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "UserEstates",
      tableName: "UserEstates",
    }
  );

  return UserEstates;
};
