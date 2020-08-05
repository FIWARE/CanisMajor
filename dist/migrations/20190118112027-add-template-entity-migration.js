'use strict';

module.exports = {
  up: function up(queryInterface, Sequelize) {
    var sequelize = queryInterface.sequelize;

    return queryInterface.createTable('templates', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      type: {
        type: Sequelize.STRING(128),
        allowNull: false,
        unique: true
      },
      template: {
        type: Sequelize.STRING(32768),
        defaultValue: null,
        allowNull: true
      },
      subject: {
        type: Sequelize.STRING(128),
        defaultValue: null,
        allowNull: true
      },
      createdAt: {
        type: Sequelize.DATE,
        field: 'created_at'
      },
      updatedAt: {
        type: Sequelize.DATE,
        field: 'updated_at'
      }
    });
  },

  down: function down(queryInterface) {
    return queryInterface.dropTable('templates');
  }
};