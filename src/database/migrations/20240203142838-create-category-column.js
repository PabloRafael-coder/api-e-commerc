'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {

    await queryInterface.addColumn('products', 'category_id', {
      type: Sequelize.INTEGER,
      references: { model: 'categories', key: 'id' },
      onUpdade: 'CASCADE',
      onDelete: 'SET NULL',
      AllowNull: true,
    });

  },

  async down(queryInterface, Sequelize) {

    await queryInterface.removeColumn('products', 'category_id');
  }
};
