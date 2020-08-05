'use strict';

var _appRootPath = require('app-root-path');

var _appRootPath2 = _interopRequireDefault(_appRootPath);

var _fsExtra = require('fs-extra');

var _fsExtra2 = _interopRequireDefault(_fsExtra);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _sequelize = require('sequelize');

var _sequelize2 = _interopRequireDefault(_sequelize);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var sequelize = require(_appRootPath2.default + '/src/sequelize');

var db = {};
// Load each model file
_fsExtra2.default.readdirSync(__dirname).filter(function (file) {
  return file.indexOf('.') !== 0 && file !== 'index.js';
}).forEach(function (file) {
  var model = sequelize.import(_path2.default.join(__dirname, file));
  db[model.name] = model;
});

Object.keys(db).forEach(function (modelName) {
  if (db[modelName].hasOwnProperty('associate')) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = _sequelize2.default;

module.exports = db;