"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class UserKeyContacts extends Model {
    static associate(models) {
      UserKeyContacts.belongsTo(models.Users, { foreignKey: "userId" });
    }
  }

  UserKeyContacts.init(
    {
      userId: DataTypes.INTEGER,
      legalAdvisor_uploadType: DataTypes.STRING,
      legalAdvisor_text: DataTypes.STRING,
      legalAdvisor_url: DataTypes.STRING,
      church_uploadType: DataTypes.STRING,
      church_text: DataTypes.STRING,
      church_url: DataTypes.STRING,
      financialAdvisor_uploadType: DataTypes.STRING,
      financialAdvisor_text: DataTypes.STRING,
      financialAdvisor_url: DataTypes.STRING,
      cemetary_uploadType: DataTypes.STRING,
      cemetary_text: DataTypes.STRING,
      cemetary_url: DataTypes.STRING,
      funeralHome_uploadType: DataTypes.STRING,
      funeralHome_text: DataTypes.STRING,
      funeralHome_url: DataTypes.STRING,
      insuranceAgent_uploadType: DataTypes.STRING,
      insuranceAgent_text: DataTypes.STRING,
      insuranceAgent_url: DataTypes.STRING,
      pastor_uploadType: DataTypes.STRING,
      pastor_text: DataTypes.STRING,
      pastor_url: DataTypes.STRING,
      beauticianBarber_uploadType: DataTypes.STRING,
      beauticianBarber_url: DataTypes.STRING,
      beauticianBarber_text: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "UserKeyContacts",
      tableName: "UserKeyContacts",
    }
  );

  return UserKeyContacts;
};
