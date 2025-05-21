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

    await queryInterface.bulkInsert("Packages", [
      {
        stripePackageId: "",
        stripePriceId: "",
        packageLabel: "Free Plan",
        packageCost: "0",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        stripePackageId: "prod_SLsTqy9DtTxD9v",
        stripePriceId: "price_1RRAiNROZ4wWyz4cMA1YwEsb",
        packageLabel: "Essentials Package",
        packageCost: "49.99",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        stripePackageId: "prod_SLsTWjkwWxBAyQ",
        stripePriceId: "price_1RRAj3ROZ4wWyz4c50wxFRlx",
        packageLabel: "Plus Package",
        packageCost: "99.00",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        stripePackageId: "prod_SLsVRxYYCFs3RE",
        stripePriceId: "price_1RRAk2ROZ4wWyz4cEYBPd5JH",
        packageLabel: "Legacy+ Package",
        packageCost: "189.00",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
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
