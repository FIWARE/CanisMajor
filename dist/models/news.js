'use strict';

module.exports = function (sequelize, DataTypes) {
  var news = null;

  news = sequelize.define('news', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    title: {
      type: DataTypes.STRING(128),
      allowNull: false,
      unique: {
        args: true,
        msg: 'value_already_used'
      },
      validate: {
        len: {
          args: [1, 128],
          msg: 'value_outside_range'
        },
        notEmpty: {
          args: true,
          msg: 'value_not_empty'
        }
      }
    },
    sub_title: {
      type: DataTypes.STRING(128),
      defaultValue: null,
      allowNull: true,
      validate: {
        len: {
          args: [1, 32768],
          msg: 'value_outside_range'
        }
      }
    },
    body: {
      type: DataTypes.TEXT,
      defaultValue: null,
      allowNull: true
    },
    image: {
      type: DataTypes.STRING,
      defaultValue: null,
      allowNull: true
    },
    tags: DataTypes.ARRAY(DataTypes.STRING),
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    createdAt: {
      type: DataTypes.DATE,
      field: 'created_at'
    },
    updatedAt: {
      type: DataTypes.DATE,
      field: 'updated_at'
    }
  }, {
    tableName: 'news'
  });

  return news;
};