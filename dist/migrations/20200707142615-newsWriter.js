'use strict';

module.exports = {
  up: function up(queryInterface, Sequelize) {
    return queryInterface.addColumn('news', // name of Source model
    'userId', // name of the key we're adding 
    {
      type: Sequelize.INTEGER,
      references: {
        model: 'users', // name of Target model
        key: 'id' // key in Target model that we're referencing
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL'
    });
  },

  down: function down(queryInterface, Sequelize) {
    return queryInterface.removeColumn('news', // name of Source model
    'userId' // key we want to remove
    );
  }
};