'use strict';

module.exports = function (sequelize, DataTypes) {
  var category = null;
  category = sequelize.define('category', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    label: {
      type: DataTypes.STRING(128),
      allowNull: false,
      unique: {
        args: true,
        msg: 'value_already_used'
      },
      validate: {
        len: {
          args: [1, 128],
          msg: "value_outside_range"
        },
        notEmpty: {
          args: true,
          msg: "value_not_empty"
        }
      }
    },
    imageUrl: {
      type: DataTypes.STRING(512),
      field: 'image_url',
      defaultValue: null,
      allowNull: true,
      validate: {
        isUrl: {
          args: true,
          msg: "invalid_field"
        },
        len: {
          args: [1, 512],
          msg: "value_outside_range"
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
    tableName: 'categories'
  });

  category.associate = function (models) {
    category.hasMany(models.coach, { onDelete: "restrict" });
  };

  return category;
};