'use strict';

module.exports = function(sequelize, DataTypes) {
 var config = null;
 config = sequelize.define('configs', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
  },
  data: {
    type: DataTypes.JSON,
    allowNull: false,
  },
}, {
  tableName: 'configs',
  validate: {
  },
  hooks: {
  }
});

  return config;
};