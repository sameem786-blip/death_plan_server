"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class UserAssetsAndAccounts extends Model {
    static associate(models) {
      UserAssetsAndAccounts.belongsTo(models.Users, { foreignKey: "userId" });
    }
  }

  UserAssetsAndAccounts.init(
    {
      userId: DataTypes.INTEGER,
      myDeathPlan_uploadType: DataTypes.STRING,
      myDeathPlan_text: DataTypes.STRING,
      myDeathPlan_url: DataTypes.STRING,
      onlineBanking_uploadType: DataTypes.STRING,
      onlineBanking_text: DataTypes.STRING,
      onlineBanking_url: DataTypes.STRING,
      socialMediaAccounts_uploadType: DataTypes.STRING,
      socialMediaAccounts_text: DataTypes.STRING,
      socialMediaAccounts_url: DataTypes.STRING,
      nftAndCryptoCurrency_uploadType: DataTypes.STRING,
      nftAndCryptoCurrency_text: DataTypes.STRING,
      nftAndCryptoCurrency_url: DataTypes.STRING,
      airlineAndHotelRewardsProgram_uploadType: DataTypes.STRING,
      airlineAndHotelRewardsProgram_text: DataTypes.STRING,
      airlineAndHotelRewardsProgram_url: DataTypes.STRING,
      blogsAndVideoChannel_uploadType: DataTypes.STRING,
      blogsAndVideoChannel_text: DataTypes.STRING,
      blogsAndVideoChannel_url: DataTypes.STRING,
      domainNames_uploadType: DataTypes.STRING,
      domainNames_text: DataTypes.STRING,
      domainNames_url: DataTypes.STRING,
      subscriptionServices_uploadType: DataTypes.STRING,
      subscriptionServices_text: DataTypes.STRING,
      subscriptionServices_url: DataTypes.STRING,
      electronicStorage_uploadType: DataTypes.STRING,
      electronicStorage_text: DataTypes.STRING,
      electronicStorage_url: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "UserAssetsAndAccounts",
      tableName: "UserAssetsAndAccounts",
    }
  );

  return UserAssetsAndAccounts;
};
