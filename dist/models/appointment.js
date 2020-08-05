'use strict';

module.exports = function (sequelize, DataTypes) {
  var appointment = null;

  appointment = sequelize.define('appointment', {
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
    userId: {
      type: DataTypes.INTEGER,
      field: "user_id",
      allowNull: false
    },
    dateTime: {
      type: DataTypes.DATE,
      field: "date_time",
      allowNull: false,
      validate: {
        isDate: {
          args: true,
          msg: "value_not_valid_date"
        }
      }
    },
    status: {
      type: DataTypes.STRING(16),
      defaultValue: 'pending',
      allowNull: false,
      validate: {
        isValid: function isValid(value) {
          if (value != 'pending' && value != 'accepted' && value !== 'cancelled') {
            throw new Error('value_outside_range');
          }
        }
      }
    },
    coachNotes: {
      type: DataTypes.STRING(1024),
      field: "coach_notes",
      defaultValue: null,
      allowNull: true,
      validate: {
        len: {
          args: [1, 1024],
          msg: "value_outside_range"
        }
      }
    },
    userNotes: {
      type: DataTypes.STRING(1024),
      field: "user_notes",
      defaultValue: null,
      allowNull: true,
      validate: {
        len: {
          args: [1, 1024],
          msg: "value_outside_range"
        }
      }
    },
    feedback: {
      type: DataTypes.STRING(1024),
      defaultValue: null,
      allowNull: true,
      validate: {
        len: {
          args: [1, 1024],
          msg: "value_outside_range"
        }
      }
    },
    rating: {
      type: DataTypes.INTEGER,
      defaultValue: null,
      allowNull: true,
      validate: {
        min: {
          args: 1,
          msg: "value_outside_range"
        },
        max: {
          args: 5,
          msg: "value_outside_range"
        }
      }
    },
    hourlyRate: {
      type: DataTypes.INTEGER,
      field: "hourly_rate",
      allowNull: true,
      validate: {
        min: {
          args: [0],
          msg: "value_outside_range"
        },
        max: {
          args: 9999,
          msg: "value_outside_range"
        }
      }
    },
    endingTime: {
      type: DataTypes.DATE,
      field: "ending_time",
      defaultValue: null,
      allowNull: true,
      validate: {
        isDate: {
          args: true,
          msg: "value_not_valid_date"
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
    tableName: 'appointments'
  });

  appointment.beforeCreate(function (appointment, options) {
    return appointment.status = 'pending';
  });

  appointment.associate = function (models) {
    appointment.belongsTo(models.user, {
      foreignKey: {
        name: 'userId',
        field: 'user_id'
      },
      onDelete: "restrict"
    });
    appointment.belongsTo(models.coach, {
      foreignKey: {
        name: 'coachId',
        field: 'coach_id'
      },
      onDelete: "restrict"
    });
  };

  return appointment;
};