"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Packages extends Model {
    static associate(models) {
      Packages.hasOne(models.Subscriptions, { foreignKey: "packageId" });
    }
  }

  Packages.init(
    {
      stripePackageId: DataTypes.TEXT,
      stripePriceId: DataTypes.TEXT,
      packageCost: DataTypes.TEXT,
      packageLabel: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: "Packages",
      tableName: "Packages",
    }
  );

  return Packages;
};
