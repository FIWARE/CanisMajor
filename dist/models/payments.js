'use strict';

module.exports = function (sequelize, DataTypes) {
  var payment;
  payment = sequelize.define('payment', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    appointmentId: {
      type: DataTypes.INTEGER,
      field: "appointment_id",
      allowNull: false
    },
    paymentValue: {
      type: DataTypes.DECIMAL(5, 2),
      field: "payment_value",
      allowNull: false
    },
    paymentStatus: {
      type: DataTypes.STRING,
      field: "payment_status",
      allowNull: false
    },
    transactionId: {
      type: DataTypes.STRING,
      field: "transaction_id",
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
    tableName: 'payments'
  });

  payment.associate = function (models) {
    payment.belongsTo(models.appointment, {
      foreignKey: {
        name: 'appointmentId',
        field: 'appointment_id'
      },
      onDelete: "restrict"
    });
  };

  return payment;
};