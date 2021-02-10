'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class entities extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  entities.init({
    id: DataTypes.INTEGER,
    entityId: DataTypes.STRING,
    txDetails: DataTypes.JSON,
  }, {
    sequelize,
    modelName: 'entities',
  });
  return entities;
};