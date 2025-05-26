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
      legalAdvisor_uploadType: DataTypes.STRING,
      legalAdvisor_uploadType: DataTypes.STRING,
      church_uploadType: DataTypes.STRING,
      church_uploadType: DataTypes.STRING,
      church_uploadType: DataTypes.STRING,
      financialAdvisor_uploadType: DataTypes.STRING,
      financialAdvisor_text: DataTypes.STRING,
      financialAdvisor_text: DataTypes.STRING,
      cemetary_text: DataTypes.STRING,
      cemetary_text: DataTypes.STRING,
      cemetary_text: DataTypes.STRING,
      funeralHome_text: DataTypes.STRING,
      funeralHome_text: DataTypes.STRING,
      funeralHome_url: DataTypes.STRING,
      insuranceAgent_url: DataTypes.STRING,
      insuranceAgent_url: DataTypes.STRING,
      insuranceAgent_url: DataTypes.STRING,
      pastor_url: DataTypes.STRING,
      pastor_url: DataTypes.STRING,
      pastor_url: DataTypes.STRING,
      beauticianBarber_url: DataTypes.STRING,
      beauticianBarber_url: DataTypes.STRING,
      beauticianBarber_url: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "UserKeyContacts",
      tableName: "UserKeyContacts",
    }
  );

  return UserKeyContacts;
};
