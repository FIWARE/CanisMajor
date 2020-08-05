'use strict';

module.exports = {
  up: function up(queryInterface, Sequelize) {

    return queryInterface.createTable('news', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      sub_title: {
        type: Sequelize.STRING,
        defaultValue: null,
        allowNull: true
      },
      body: {
        type: Sequelize.TEXT,
        defaultValue: null,
        allowNull: true
      },
      tags: Sequelize.ARRAY(Sequelize.STRING),
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
    return queryInterface.dropTable('news');
  }
};