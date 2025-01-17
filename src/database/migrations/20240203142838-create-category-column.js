'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {

    await queryInterface.addColumn('products', 'category_id', {
      type: Sequelize.INTEGER,
      references: {model: 'categories', key: 'id'},
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
      AllowNull: true,
    });
  },

  async down(queryInterface) {

    await queryInterface.removeColumn('products', 'category_id');
  }
};
