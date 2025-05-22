"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Subscriptions extends Model {
    static associate(models) {
      Subscriptions.belongsTo(models.Users, { foreignKey: "userId" });
      Subscriptions.belongsTo(models.Packages, { foreignKey: "packageId" });
    }
  }

  Subscriptions.init(
    {
      userId: DataTypes.INTEGER,
      packageId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Subscriptions",
      tableName: "Subscriptions",
    }
  );

  return Subscriptions;
};
