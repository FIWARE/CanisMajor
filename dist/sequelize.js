'use strict';

var appRoot = require('app-root-path');
var Sequelize = require('sequelize');
var env = process.env.NODE_ENV || 'development';
var config = require(appRoot + '/src/config/config')[env];
var sequelize = new Sequelize(config.database, config.username, config.password, config);

module.exports = sequelize;