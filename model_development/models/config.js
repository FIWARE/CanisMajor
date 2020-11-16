'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class config extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  config.init({
    id: DataTypes.INTEGER,
    data: DataTypes.JSON
  }, {
    sequelize,
    modelName: 'config',
  });
  return config;
};