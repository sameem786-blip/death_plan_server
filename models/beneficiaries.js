"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Beneficiaries extends Model {
    static associate(models) {
      Beneficiaries.belongsTo(models.Users, { foreignKey: "userId" });
    }
  }

  Beneficiaries.init(
    {
      userId: DataTypes.INTEGER,
      fullName: DataTypes.STRING,
      email: DataTypes.STRING,
      contact: DataTypes.STRING,
      relationShip: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Beneficiaries",
      tableName: "Beneficiaries",
    }
  );

  return Beneficiaries;
};
