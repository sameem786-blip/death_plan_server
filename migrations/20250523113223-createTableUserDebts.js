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
    await queryInterface.createTable("UserDebts", {
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
      creditorPhone: {
        type: Sequelize.STRING,
      },
      creditorAddress: {
        type: Sequelize.STRING,
      },
      creditorAccountNumber: {
        type: Sequelize.STRING,
      },
      paymentAmount: {
        type: Sequelize.STRING,
      },
      dueDate: {
        type: Sequelize.DATEONLY,
      },
      balance: {
        type: Sequelize.STRING,
      },
      insured: {
        defaultValue: false,
        type: Sequelize.BOOLEAN,
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
