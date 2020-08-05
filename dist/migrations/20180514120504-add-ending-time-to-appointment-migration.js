'use strict';

module.exports = {
  up: function up(queryInterface, Sequelize) {
    return queryInterface.addColumn('appointments', 'ending_time', {
      type: Sequelize.DATE,
      defaultValue: null,
      allowNull: true
    });
  },

  down: function down(queryInterface) {
    return queryInterface.removeColumn('appointments', 'ending_time');
  }
};