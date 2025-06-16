"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class AdditionalUploads extends Model {
    static associate(models) {
      AdditionalUploads.belongsTo(models.Users, { foreignKey: "userId" });
    }
  }

  AdditionalUploads.init(
    {
      userId: DataTypes.INTEGER,
      uploadUrl: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: "AdditionalUploads",
      tableName: "AdditionalUploads",
    }
  );

  return AdditionalUploads;
};
