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
    unique: true
  },
  txDetails: {
    type: DataTypes.JSON,
    allowNull: true
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