'use strict'

module.exports = {
  async up(queryInterface, Sequelize) {

    await queryInterface.addColumn('products', 'offer', {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        AllowNull: false
    });

  },

  async down(queryInterface) {

    await queryInterface.removeColumn('products', 'offer');

  }
};
