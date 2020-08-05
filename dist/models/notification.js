'use strict';

module.exports = function (sequelize, DataTypes) {
  var notification;
  notification = sequelize.define('notification', {
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
    objectType: {
      type: DataTypes.STRING(32),
      field: "object_type",
      allowNull: true,
      validate: {
        len: {
          args: [1, 32],
          msg: "value_outside_range"
        }
      }
    },
    objectId: {
      type: DataTypes.INTEGER,
      field: "object_id",
      allowNull: true
    },
    notificationType: {
      type: DataTypes.STRING(32),
      field: "notification_type",
      allowNull: false,
      validate: {
        len: {
          args: [1, 32],
          msg: "value_outside_range"
        }
      }
    },
    seen: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
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
    tableName: 'notifications'
  });

  notification.associate = function (models) {
    notification.belongsTo(models.user, {
      foreignKey: {
        name: 'userId',
        field: 'user_id'
      },
      onDelete: "restrict"
    });
  };

  return notification;
};