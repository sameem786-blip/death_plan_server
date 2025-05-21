"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    static associate(models) {
      Users.hasMany(models.Land_RealEstate_Estates, { foreignKey: "userId" });
      Users.hasMany(models.Vehicle_RealEstate_Estates, {
        foreignKey: "userId",
      });
      Users.hasMany(models.Beneficiaries, {
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
      packageId: DataTypes.STRING,
      subscribed: DataTypes.BOOLEAN,
      stripeCustomerId: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Users",
      tableName: "Users",
    }
  );

  return Users;
};
