"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class UserInsurances extends Model {
    static associate(models) {
      UserInsurances.belongsTo(models.Users, { foreignKey: "userId" });
    }
  }

  UserInsurances.init(
    {
      userId: DataTypes.INTEGER,
      life_uploadType: DataTypes.STRING,
      life_text: DataTypes.STRING,
      life_url: DataTypes.STRING,
      liability_uploadType: DataTypes.STRING,
      liability_text: DataTypes.STRING,
      liability_url: DataTypes.STRING,
      ltc_uploadType: DataTypes.STRING,
      ltc_text: DataTypes.STRING,
      ltc_url: DataTypes.STRING,
      ltd_uploadType: DataTypes.STRING,
      ltd_text: DataTypes.STRING,
      ltd_url: DataTypes.STRING,
      criticalIllness_uploadType: DataTypes.STRING,
      criticalIllness_text: DataTypes.STRING,
      criticalIllness_url: DataTypes.STRING,
      credit_uploadType: DataTypes.STRING,
      credit_text: DataTypes.STRING,
      credit_url: DataTypes.STRING,
      pet_uploadType: DataTypes.STRING,
      pet_text: DataTypes.STRING,
      pet_url: DataTypes.STRING,
      gap_uploadType: DataTypes.STRING,
      gap_text: DataTypes.STRING,
      gap_url: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "UserInsurances",
      tableName: "UserInsurances",
    }
  );

  return UserInsurances;
};
