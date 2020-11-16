'use strict';
import appRoot from 'app-root-path';
import fs from 'fs-extra';
import path from 'path';
import Sequelize from 'sequelize';
const sequelize = require(appRoot + '/src/sequelize');

var db = {};
// Load each model file
fs
  .readdirSync(__dirname)
  .filter(function(file) {
    return (file.indexOf('.') !== 0) && (file !== 'index.js');
  })
  .forEach(function(file) {
    var model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach(function(modelName) {
  if (db[modelName].hasOwnProperty('associate')) {
    db[modelName].associate(db)
  }
})

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
