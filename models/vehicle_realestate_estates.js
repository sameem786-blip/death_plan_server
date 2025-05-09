"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Vehicle_RealEstate_Estates extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Vehicle_RealEstate_Estates.belongsTo(models.Users, {
        foreignKey: "userId",
      });
    }
  }
  Vehicle_RealEstate_Estates.init(
    {
      userId: DataTypes.INTEGER,
      title: DataTypes.TEXT,
      description: DataTypes.TEXT,
      value: DataTypes.TEXT,
      status: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Vehicle_RealEstate_Estates",
    }
  );
  return Vehicle_RealEstate_Estates;
};
