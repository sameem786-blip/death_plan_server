"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Land_RealEstate_Estates extends Model {
    static associate(models) {
      Land_RealEstate_Estates.belongsTo(models.Users, { foreignKey: "userId" });
    }
  }

  Land_RealEstate_Estates.init(
    {
      userId: DataTypes.INTEGER,
      title: DataTypes.STRING,
      description: DataTypes.STRING,
      value: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: "Land_RealEstate_Estates",
      tableName: "Land_RealEstate_Estates",
    }
  );

  return Land_RealEstate_Estates;
};
