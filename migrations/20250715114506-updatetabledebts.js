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
    await queryInterface.addColumn("UserDebts", "text", {
      type: Sequelize.TEXT,
    });
    await queryInterface.addColumn("UserDebts", "uploadType", {
      type: Sequelize.TEXT,
    });
    await queryInterface.addColumn("UserDebts", "value", {
      type: Sequelize.TEXT,
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
