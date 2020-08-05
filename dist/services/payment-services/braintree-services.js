'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _appointmentsRepository = require('../../repositories/appointments-repository');

var _appointmentsRepository2 = _interopRequireDefault(_appointmentsRepository);

var _braintree = require('braintree');

var _braintree2 = _interopRequireDefault(_braintree);

var _config = require('../../config/config.json');

var _config2 = _interopRequireDefault(_config);

var _generalErrors = require('../error-services/general-errors');

var _generalErrors2 = _interopRequireDefault(_generalErrors);

var _paymentErrors = require('../error-services/payment-errors');

var _paymentErrors2 = _interopRequireDefault(_paymentErrors);

var _paymentRepository = require('../../repositories/payment-repository');

var _paymentRepository2 = _interopRequireDefault(_paymentRepository);

var _usersRepository = require('../../repositories/users-repository');

var _usersRepository2 = _interopRequireDefault(_usersRepository);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var BraintreeServices = function () {
  function BraintreeServices() {
    _classCallCheck(this, BraintreeServices);

    this.gateway = _braintree2.default.connect({
      environment: _braintree2.default.Environment.Sandbox,
      merchantId: _config2.default.braintree.merchantID,
      publicKey: _config2.default.braintree.publicKey,
      privateKey: _config2.default.braintree.privateKey
    });
  }

  _createClass(BraintreeServices, [{
    key: 'getGateway',
    value: function getGateway() {
      return this.gateway;
    }
  }, {
    key: 'createCheckout',
    value: function createCheckout(appointmentId) {
      var _this = this;

      var appointment = null;

      return _appointmentsRepository2.default.findOneById(appointmentId).then(function (appointmentObj) {
        appointment = appointmentObj;

        return _paymentRepository2.default.findOneByAppointmentIdAndPaymentStatus(appointment.id, ['submitted_for_settlement']);
      }).then(function (payment) {
        if (payment) {
          return _generalErrors2.default.badRequest('payment_processed_already');
        }

        return _usersRepository2.default.findOneByIdWithPaymentData(appointment.userId);
      }).then(function (user) {
        if (appointment.hourlyRate == 0) {
          return {
            success: true,
            transaction: {
              amount: 0,
              status: 'submitted_for_settlement',
              id: 'empty_payment_' + appointment.id
            }
          };
        }

        return _this.getGateway().transaction.sale({
          amount: appointment.hourlyRate,
          customerId: user.braintreeCustomerId,
          options: {
            submitForSettlement: true
          }
        });
      }).then(function (result) {
        if (result.success) {
          return _paymentRepository2.default.create(appointment, result.transaction);
        } else {
          return _paymentErrors2.default.createTransactionErrors(result);
        }
      }).catch(function (err) {
        _generalErrors2.default.addErrStatus(err, 400);

        throw err;
      });
    }
  }]);

  return BraintreeServices;
}();

exports.default = new BraintreeServices();