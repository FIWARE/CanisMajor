'use strict';

var moment = require('moment');

module.exports = function (sequelize, DataTypes) {
  var coachWorkHours;
  coachWorkHours = sequelize.define('coachWorkHours', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    coachId: {
      type: DataTypes.INTEGER,
      field: "coach_id",
      allowNull: false
    },
    morningSessionStart: {
      type: DataTypes.INTEGER,
      field: "morning_session_start",
      allowNull: false,
      defaultValue: 9,
      validate: {
        min: {
          args: [0],
          msg: "value_outside_range"
        },
        max: {
          args: 24,
          msg: "value_outside_range"
        }
      }
    },
    morningSessionEnd: {
      type: DataTypes.INTEGER,
      field: "morning_session_end",
      allowNull: false,
      defaultValue: 12,
      validate: {
        min: {
          args: [0],
          msg: "value_outside_range"
        },
        max: {
          args: 24,
          msg: "value_outside_range"
        }
      }
    },
    afternoonSessionStart: {
      type: DataTypes.INTEGER,
      field: "afternoon_session_start",
      allowNull: false,
      defaultValue: 14,
      validate: {
        min: {
          args: [0],
          msg: "value_outside_range"
        },
        max: {
          args: 24,
          msg: "value_outside_range"
        }
      }
    },
    afternoonSessionEnd: {
      type: DataTypes.INTEGER,
      field: "afternoon_session_end",
      allowNull: false,
      defaultValue: 18,
      validate: {
        min: {
          args: [0],
          msg: "value_outside_range"
        },
        max: {
          args: 24,
          msg: "value_outside_range"
        }
      }
    },
    acceptOutsideWorkingHours: {
      field: 'accept_outside_working_hours',
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
    timeZone: {
      type: DataTypes.STRING,
      field: "time_zone",
      allowNull: false,
      validate: {
        isValid: function isValid(value) {
          if (!moment.tz.zone(value)) {
            throw new Error('inexistent_timezone_name');
          }
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
    tableName: 'coach_work_hours'
  });

  coachWorkHours.associate = function (models) {
    coachWorkHours.belongsTo(models.coach, {
      foreignKey: {
        name: 'coachId',
        field: 'coach_id'
      },
      onDelete: "restrict"
    });
  };

  return coachWorkHours;
};