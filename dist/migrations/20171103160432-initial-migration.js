'use strict';

var appRoot = require('app-root-path');
var fs = require('fs-extra');
var Promise = require('bluebird');

module.exports = {
  up: function up(queryInterface) {
    return Promise.resolve().then(function () {
      return fs.readFileSync(appRoot + '/src/migrations/initial/initial-database-dump.sql', 'utf-8');
    }).then(function (initialSchema) {
      return queryInterface.sequelize.query(initialSchema);
    });
  },

  down: function down(queryInterface) {
    return queryInterface.dropAllTables();
  }
};