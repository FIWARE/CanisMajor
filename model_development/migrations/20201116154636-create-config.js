'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('configs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      contextType: {
        allowNull: false,
        type: Sequelize.STRING
      },
      dlt_config: {
        type: Sequelize.JSON
      },
      contextMapping: {
        type: Sequelize.JSON,
        unique: true
      },
      meta: {
        type: Sequelize.JSON 
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('configs');
  }
};