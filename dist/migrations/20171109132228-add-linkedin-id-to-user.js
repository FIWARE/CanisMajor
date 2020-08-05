'use strict';

module.exports = {
  up: function up(queryInterface, Sequelize) {
    return queryInterface.addColumn('users', 'linkedin_id', {
      type: Sequelize.STRING,
      allowNull: true,
      defaultValue: null,
      unique: true
    });
  },

  down: function down(queryInterface) {
    return queryInterface.removeColumn('users', 'linkedin_id');
  }
};