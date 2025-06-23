"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    static associate(models) {
      Users.hasMany(models.UserRealEstates, { foreignKey: "userId" });
      Users.hasMany(models.UserInsurances, { foreignKey: "userId" });
      Users.hasMany(models.UserDebts, { foreignKey: "userId" });
      Users.hasMany(models.UserMedicalEmergencies, { foreignKey: "userId" });
      Users.hasMany(models.UserFinancialEmergencies, { foreignKey: "userId" });
      Users.hasMany(models.UserAssetsAndAccounts, { foreignKey: "userId" });
      Users.hasMany(models.UserObituaries, { foreignKey: "userId" });
      Users.hasMany(models.UserKeyContacts, { foreignKey: "userId" });
      Users.hasMany(models.AdditionalUploads, { foreignKey: "userId" });

      Users.hasMany(models.Beneficiaries, {
        foreignKey: "userId",
      });
      Users.hasMany(models.TransactionHistories, {
        foreignKey: "userId",
      });
      Users.hasOne(models.Subscriptions, {
        foreignKey: "userId",
      });
    }
  }

  Users.init(
    {
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      fullName: DataTypes.STRING,
      email: DataTypes.STRING,
      encryptedPassword: DataTypes.STRING,
      accessPassword: DataTypes.STRING,
      avatar: DataTypes.STRING,
      role: DataTypes.STRING,
      isAlive: DataTypes.BOOLEAN,
      isWillComplete: DataTypes.BOOLEAN,
      isWillStarted: DataTypes.BOOLEAN,
      dateOfBirth: DataTypes.DATEONLY,
      prefferedContactMethod: DataTypes.STRING,
      gender: DataTypes.STRING,
      contact: DataTypes.STRING,
      bio: DataTypes.STRING,
      subscribed: DataTypes.BOOLEAN,
      stripeCustomerId: DataTypes.STRING,
      referralSource: DataTypes.STRING,
      referralSourceSpecification: DataTypes.STRING,
      medicalEmergenciesOpened: DataTypes.BOOLEAN,
      financialEmergenciesOpened: DataTypes.BOOLEAN,
      beneficiariesOpened: DataTypes.BOOLEAN,
      nextStepsOpened: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "Users",
      tableName: "Users",
    }
  );

  return Users;
};
