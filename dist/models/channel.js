'use strict';

module.exports = function (sequelize, DataTypes) {
  var channel = null;
  channel = sequelize.define('channel', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    userId: {
      type: DataTypes.INTEGER,
      field: "user_id",
      allowNull: false
    },
    name: {
      type: DataTypes.STRING(128),
      allowNull: false,
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
    lastVisit: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Date.now()
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
    tableName: 'channels'
  });

  channel.associate = function (models) {
    channel.belongsTo(models.user, {
      foreignKey: {
        name: 'userId',
        field: 'user_id'
      },
      onDelete: "restrict"
    });
  };

  return channel;
};