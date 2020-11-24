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
  contextType: {
    type: DataTypes.STRING,
    allowNull: false
  },
  dlt_config: {
    type: DataTypes.JSON,
    allowNull: false,
  },
  contextMapping: {
    type: DataTypes.JSON,
    allowNull: false,
  },
  meta: {
    type: DataTypes.JSON,
    allowNull: true
  }
}, {
  tableName: 'configs',
  validate: {
  },
  hooks: {
  }
});

  return config;
};