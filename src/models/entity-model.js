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
    type: DataTypes.JSON,
    allowNull: false,
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