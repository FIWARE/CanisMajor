'use strict';

module.exports = function (sequelize, DataTypes) {
  var coach;
  coach = sequelize.define('coach', {
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
    categoryId: {
      type: DataTypes.INTEGER,
      field: "category_id",
      allowNull: true,
      defaultValue: null
    },
    specialityId: {
      type: DataTypes.INTEGER,
      field: "speciality_id",
      allowNull: true,
      defaultValue: null
    },
    mission: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        len: {
          args: [1, 1024],
          msg: "value_outside_range"
        }
      }
    },
    hourlyRate: {
      type: DataTypes.INTEGER,
      field: "hourly_rate",
      allowNull: false,
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
    rating: {
      type: DataTypes.DECIMAL(4, 2),
      allowNull: true,
      defaultValue: null
    },
    status: {
      type: DataTypes.STRING(16),
      allowNull: false,
      defaultValue: 'pending',
      validate: {
        len: {
          args: [1, 16],
          msg: "value_outside_range"
        },
        isValid: function isValid(value) {
          if (value != 'pending' && value != 'approved') {
            throw new Error('value_outside_range');
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
    tableName: 'coaches'
  });

  coach.associate = function (models) {
    coach.hasMany(models.appointment, { onDelete: "cascade" });
    coach.hasOne(models.coachWorkHours, { onDelete: "cascade" });
    coach.belongsTo(models.user, {
      foreignKey: {
        name: 'userId',
        field: 'user_id'
      },
      onDelete: "restrict"
    });
    coach.belongsTo(models.category, {
      foreignKey: {
        name: 'categoryId',
        field: 'category_id'
      },
      onDelete: "restrict"
    });
    coach.belongsTo(models.speciality, {
      foreignKey: {
        name: 'specialityId',
        field: 'speciality_id'
      },
      onDelete: "restrict"
    });
  };

  return coach;
};