'use strict';

module.exports = {
  up: function up(queryInterface, Sequelize) {
    return queryInterface.addColumn('users', 'isVerified', {
      type: Sequelize.BOOLEAN,
      allowNull: true,
      defaultValue: false
    });
  },

  down: function down(queryInterface) {
    return queryInterface.removeColumn('users', 'isVerified');
  }
};