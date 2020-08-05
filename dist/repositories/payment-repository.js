'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var db = require("../models/index");

var PaymentRepository = function () {
  function PaymentRepository() {
    _classCallCheck(this, PaymentRepository);
  }

  _createClass(PaymentRepository, [{
    key: 'findOneByAppointmentIdAndPaymentStatus',
    value: function findOneByAppointmentIdAndPaymentStatus(appointmentId, paymentStatus) {
      return db.payment.findOne({
        where: {
          paymentStatus: paymentStatus,
          appointmentId: appointmentId
        }
      });
    }
  }, {
    key: 'create',
    value: function create(appointment, paymentDetails) {
      return db.payment.create({
        appointmentId: appointment.id,
        paymentValue: paymentDetails.amount,
        paymentStatus: paymentDetails.status,
        transactionId: paymentDetails.id
      });
    }
  }, {
    key: 'findAndCountAllByFilterAndUserId',
    value: function findAndCountAllByFilterAndUserId(userId, options) {
      return db.payment.findAndCountAll({
        where: options.filters,
        include: {
          model: db.appointment,
          where: {
            userId: userId
          },
          include: {
            model: db.coach,
            include: {
              model: db.user,
              attributes: db.user.options.publicFields
            }
          }
        },
        order: [['createdAt', 'DESC']],
        offset: options.pagination.offset,
        limit: options.pagination.limit
      });
    }
  }]);

  return PaymentRepository;
}();

exports.default = new PaymentRepository();