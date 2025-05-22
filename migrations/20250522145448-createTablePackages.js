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
    await queryInterface.createTable("UserEstates", {
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
      landRealEstate_uploadType: {
        type: Sequelize.STRING,
      },
      landRealEstate_text: {
        type: Sequelize.STRING,
      },
      landRealEstate_url: {
        type: Sequelize.STRING,
      },
      vehicles_uploadType: {
        type: Sequelize.STRING,
      },
      vehicles_text: {
        type: Sequelize.STRING,
      },
      vehicles_url: {
        type: Sequelize.STRING,
      },
      collectibles_uploadType: {
        type: Sequelize.STRING,
      },
      collectibles_text: {
        type: Sequelize.STRING,
      },
      collectibles_url: {
        type: Sequelize.STRING,
      },
      accounts_uploadType: {
        type: Sequelize.STRING,
      },
      accounts_text: {
        type: Sequelize.STRING,
      },
      accounts_url: {
        type: Sequelize.STRING,
      },
      policies_uploadType: {
        type: Sequelize.STRING,
      },
      policies_text: {
        type: Sequelize.STRING,
      },
      policies_url: {
        type: Sequelize.STRING,
      },
      interests_uploadType: {
        type: Sequelize.STRING,
      },
      interests_text: {
        type: Sequelize.STRING,
      },
      interests_url: {
        type: Sequelize.STRING,
      },
      stockBonds_uploadType: {
        type: Sequelize.STRING,
      },
      stockBonds_text: {
        type: Sequelize.STRING,
      },
      stockBonds_url: {
        type: Sequelize.STRING,
      },
      obligations_uploadType: {
        type: Sequelize.STRING,
      },
      obligations_text: {
        type: Sequelize.STRING,
      },
      obligations_url: {
        type: Sequelize.STRING,
      },
      peoplePets_uploadType: {
        type: Sequelize.STRING,
      },
      peoplePets_text: {
        type: Sequelize.STRING,
      },
      peoplePets_url: {
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
