"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("TransactionHistories", {
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
      stripeSubscriptionId: {
        type: Sequelize.STRING,
      },
      invoiceId: {
        type: Sequelize.STRING,
      },
      paymentIntentId: {
        type: Sequelize.STRING,
      },
      amount: {
        type: Sequelize.DECIMAL(10, 2),
      },
      currency: {
        type: Sequelize.STRING,
      },
      status: {
        type: Sequelize.STRING,
      },
      billingReason: {
        type: Sequelize.STRING,
      },
      periodStart: {
        type: Sequelize.DATE,
      },
      periodEnd: {
        type: Sequelize.DATE,
      },
      paidAt: {
        type: Sequelize.DATE,
      },
      packageId: {
        type: Sequelize.INTEGER,
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
    await queryInterface.dropTable("TransactionHistories");
  },
};
