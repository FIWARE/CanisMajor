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
  contextMapping: {
    type: DataTypes.JSON,
    allowNull: false,
  },
  metadata: {
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