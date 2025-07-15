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
      policyType: DataTypes.STRING,
      insuranceCompany: DataTypes.STRING,
      policyNumber: DataTypes.STRING,
      beneficiary: DataTypes.STRING,
      uploadType: DataTypes.TEXT,
      value: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: "UserInsurances",
      tableName: "UserInsurances",
    }
  );

  return UserInsurances;
};
