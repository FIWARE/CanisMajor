'use strict';

module.exports = function(sequelize, DataTypes) {
 var entities = null;
 entities = sequelize.define('entities', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
  },
  entityId: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  txDetails: {
    type: DataTypes.JSON,
    allowNull: true,
    defaultValue: null
  },
}, {
  tableName: 'entities',
  validate: {
  },
  hooks: {
  }
});

  return entities;
};