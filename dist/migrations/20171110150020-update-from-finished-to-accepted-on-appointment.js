'use strict';

module.exports = {
  up: function up(queryInterface) {
    return queryInterface.sequelize.query("UPDATE appointments SET status='accepted' WHERE status='finished'");
  },

  down: function down() {}
};