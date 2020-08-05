'use strict';

module.exports = function (sequelize, DataTypes) {
  var template = null;

  template = sequelize.define('template', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    type: {
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
    template: {
      type: DataTypes.STRING(32768),
      defaultValue: null,
      allowNull: true,
      validate: {
        len: {
          args: [1, 32768],
          msg: 'value_outside_range'
        }
      }
    },
    subject: {
      type: DataTypes.STRING(128),
      defaultValue: null,
      allowNull: true,
      validate: {
        len: {
          args: [1, 128],
          msg: 'value_outside_range'
        }
      }
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
    tableName: 'templates'
  });

  return template;
};