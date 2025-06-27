"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class UserMedicalEmergencies extends Model {
    static associate(models) {
      UserMedicalEmergencies.belongsTo(models.Users, { foreignKey: "userId" });
    }
  }

  UserMedicalEmergencies.init(
    {
      userId: DataTypes.INTEGER,
      poa_text: DataTypes.TEXT,
      poa_url: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: "UserMedicalEmergencies",
      tableName: "UserMedicalEmergencies",
    }
  );

  return UserMedicalEmergencies;
};
