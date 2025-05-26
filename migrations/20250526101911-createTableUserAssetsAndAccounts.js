"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.createTable("UserAssetsAndAccounts", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      userId: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      myDeathPlan_uploadType: {
        type: Sequelize.STRING,
      },
      myDeathPlan_text: {
        type: Sequelize.STRING,
      },
      myDeathPlan_url: {
        type: Sequelize.STRING,
      },
      onlineBanking_uploadType: {
        type: Sequelize.STRING,
      },
      onlineBanking_text: {
        type: Sequelize.STRING,
      },
      onlineBanking_url: {
        type: Sequelize.STRING,
      },
      socialMediaAccounts_uploadType: {
        type: Sequelize.STRING,
      },
      socialMediaAccounts_text: {
        type: Sequelize.STRING,
      },
      socialMediaAccounts_url: {
        type: Sequelize.STRING,
      },
      nftAndCryptoCurrency_uploadType: {
        type: Sequelize.STRING,
      },
      nftAndCryptoCurrency_text: {
        type: Sequelize.STRING,
      },
      nftAndCryptoCurrency_url: {
        type: Sequelize.STRING,
      },
      airlineAndHotelRewardsProgram_uploadType: {
        type: Sequelize.STRING,
      },
      airlineAndHotelRewardsProgram_text: {
        type: Sequelize.STRING,
      },
      airlineAndHotelRewardsProgram_url: {
        type: Sequelize.STRING,
      },
      blogsAndVideoChannel_uploadType: {
        type: Sequelize.STRING,
      },
      blogsAndVideoChannel_text: {
        type: Sequelize.STRING,
      },
      blogsAndVideoChannel_url: {
        type: Sequelize.STRING,
      },
      domainNames_uploadType: {
        type: Sequelize.STRING,
      },
      domainNames_text: {
        type: Sequelize.STRING,
      },
      domainNames_url: {
        type: Sequelize.STRING,
      },
      subscriptionServices_uploadType: {
        type: Sequelize.STRING,
      },
      subscriptionServices_text: {
        type: Sequelize.STRING,
      },
      subscriptionServices_url: {
        type: Sequelize.STRING,
      },
      electronicStorage_uploadType: {
        type: Sequelize.STRING,
      },
      electronicStorage_text: {
        type: Sequelize.STRING,
      },
      electronicStorage_url: {
        type: Sequelize.STRING,
      },

      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  },
};
