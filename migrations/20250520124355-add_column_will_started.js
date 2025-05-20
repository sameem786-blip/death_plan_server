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
    await queryInterface.addColumn("Users", "dateOfBirth", {
      type: Sequelize.DATEONLY,
    });
    await queryInterface.addColumn("Users", "prefferedContactMethod", {
      type: Sequelize.TEXT,
    });
    await queryInterface.addColumn("Users", "gender", {
      type: Sequelize.TEXT,
    });
    await queryInterface.addColumn("Users", "contact", {
      type: Sequelize.TEXT,
    });
    await queryInterface.addColumn("Users", "bio", {
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
