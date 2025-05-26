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
    await queryInterface.createTable("UserKeyContacts", {
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
      legalAdvisor_uploadType: {
        type: Sequelize.STRING,
      },
      legalAdvisor_text: {
        type: Sequelize.STRING,
      },
      legalAdvisor_url: {
        type: Sequelize.STRING,
      },
      church_uploadType: {
        type: Sequelize.STRING,
      },
      church_text: {
        type: Sequelize.STRING,
      },
      church_url: {
        type: Sequelize.STRING,
      },
      financialAdvisor_uploadType: {
        type: Sequelize.STRING,
      },
      financialAdvisor_text: {
        type: Sequelize.STRING,
      },
      financialAdvisor_url: {
        type: Sequelize.STRING,
      },
      cemetary_uploadType: {
        type: Sequelize.STRING,
      },
      cemetary_text: {
        type: Sequelize.STRING,
      },
      cemetary_url: {
        type: Sequelize.STRING,
      },
      funeralHome_uploadType: {
        type: Sequelize.STRING,
      },
      funeralHome_text: {
        type: Sequelize.STRING,
      },
      funeralHome_url: {
        type: Sequelize.STRING,
      },
      insuranceAgent_uploadType: {
        type: Sequelize.STRING,
      },
      insuranceAgent_text: {
        type: Sequelize.STRING,
      },
      insuranceAgent_url: {
        type: Sequelize.STRING,
      },
      pastor_uploadType: {
        type: Sequelize.STRING,
      },
      pastor_text: {
        type: Sequelize.STRING,
      },
      pastor_url: {
        type: Sequelize.STRING,
      },
      beauticianBarber_uploadType: {
        type: Sequelize.STRING,
      },
      beauticianBarber_text: {
        type: Sequelize.STRING,
      },
      beauticianBarber_url: {
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
