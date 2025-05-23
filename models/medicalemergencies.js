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
      advancedHealthcareDirective_uploadType: DataTypes.STRING,
      advancedHealthcareDirective_text: DataTypes.STRING,
      advancedHealthcareDirective_url: DataTypes.STRING,
      healthcarePowerOfAttorney_uploadType: DataTypes.STRING,
      healthcarePowerOfAttorney_text: DataTypes.STRING,
      healthcarePowerOfAttorney_url: DataTypes.STRING,
      hIPPAAuthorization_uploadType: DataTypes.STRING,
      hIPPAAuthorization_text: DataTypes.STRING,
      hIPPAAuthorization_url: DataTypes.STRING,
      doNotResuscitateOrder_uploadType: DataTypes.STRING,
      doNotResuscitateOrder_text: DataTypes.STRING,
      doNotResuscitateOrder_url: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "UserMedicalEmergencies",
      tableName: "UserMedicalEmergencies",
    }
  );

  return UserMedicalEmergencies;
};
