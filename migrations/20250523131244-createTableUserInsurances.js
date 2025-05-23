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
    await queryInterface.createTable("UserInsurances", {
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
      life_uploadType: {
        type: Sequelize.STRING,
      },
      life_text: {
        type: Sequelize.STRING,
      },
      life_url: {
        type: Sequelize.STRING,
      },
      liability_uploadType: {
        type: Sequelize.STRING,
      },
      liability_text: {
        type: Sequelize.STRING,
      },
      liability_url: {
        type: Sequelize.STRING,
      },
      ltc_uploadType: {
        type: Sequelize.STRING,
      },
      ltc_text: {
        type: Sequelize.STRING,
      },
      ltc_url: {
        type: Sequelize.STRING,
      },
      ltd_uploadType: {
        type: Sequelize.STRING,
      },
      ltd_text: {
        type: Sequelize.STRING,
      },
      ltd_url: {
        type: Sequelize.STRING,
      },
      criticalIllness_uploadType: {
        type: Sequelize.STRING,
      },
      criticalIllness_text: {
        type: Sequelize.STRING,
      },
      criticalIllness_url: {
        type: Sequelize.STRING,
      },
      credit_uploadType: {
        type: Sequelize.STRING,
      },
      credit_text: {
        type: Sequelize.STRING,
      },
      credit_url: {
        type: Sequelize.STRING,
      },
      pet_uploadType: {
        type: Sequelize.STRING,
      },
      pet_text: {
        type: Sequelize.STRING,
      },
      pet_url: {
        type: Sequelize.STRING,
      },
      gap_uploadType: {
        type: Sequelize.STRING,
      },
      gap_text: {
        type: Sequelize.STRING,
      },
      gap_url: {
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
