'use strict';

module.exports = {
  up: function up(queryInterface, Sequelize) {
    return queryInterface.addColumn('news', 'image', {
      type: Sequelize.STRING,
      allowNull: true,
      defaultValue: null
    });
  },

  down: function down(queryInterface) {
    return queryInterface.removeColumn('news', 'image');
  }
};