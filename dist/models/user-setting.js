'use strict';

module.exports = function (sequelize, DataTypes) {
  var userSetting = null;
  userSetting = sequelize.define('userSetting', {
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
    notificationNewMessage: {
      field: 'notification_new_message',
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
    notificationAppointmentAccepted: {
      field: 'notification_appointment_accepted',
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
    notificationAppointmentCancelled: {
      field: 'notification_appointment_cancelled',
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
    emailNotifications: {
      field: 'email_notifications',
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
    emailOffers: {
      field: 'email_offers',
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
    calendarSync: {
      field: 'calendar_sync',
      type: DataTypes.BOOLEAN,
      defaultValue: true
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
    tableName: 'user_settings'
  });

  userSetting.associate = function (models) {
    userSetting.belongsTo(models.user, {
      foreignKey: {
        name: 'userId',
        field: 'user_id'
      },
      onDelete: "restrict"
    });
  };

  return userSetting;
};