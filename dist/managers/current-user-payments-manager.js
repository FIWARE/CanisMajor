'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _braintree = require('braintree');

var _braintree2 = _interopRequireDefault(_braintree);

var _braintreeServices = require('../services/payment-services/braintree-services');

var _braintreeServices2 = _interopRequireDefault(_braintreeServices);

var _config = require('../config/config.json');

var _config2 = _interopRequireDefault(_config);

var _paymentErrors = require('../services/error-services/payment-errors');

var _paymentErrors2 = _interopRequireDefault(_paymentErrors);

var _usersRepository = require('../repositories/users-repository');

var _usersRepository2 = _interopRequireDefault(_usersRepository);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var CurrentUserPaymentsManager = function () {
  function CurrentUserPaymentsManager() {
    _classCallCheck(this, CurrentUserPaymentsManager);

    this.gateway = _braintreeServices2.default.getGateway();
  }

  _createClass(CurrentUserPaymentsManager, [{
    key: 'createBraintreeCustomer',
    value: function createBraintreeCustomer(reqUser, reqBody) {
      var _this = this;

      var resultObject = {};
      var userDetails = {};
      var creditCardDetails = {};

      return _usersRepository2.default.findOneByIdWithPaymentData(reqUser.id).then(function (user) {
        userDetails = user;
        if (user.braintreeCustomerId) {
          return Promise.resolve({
            customer: {
              id: user.braintreeCustomerId
            }
          });
        }

        return _this.gateway.customer.create();
      }).then(function (createCustomerResult) {
        _paymentErrors2.default.createBraintreeCustomerErrors(createCustomerResult);
        resultObject = createCustomerResult;

        return _this.gateway.paymentMethod.create({
          customerId: resultObject.customer.id,
          paymentMethodNonce: reqBody.paymentMethodNonce
        });
      }).then(function (createPaymentMethodResult) {
        _paymentErrors2.default.createBraintreeCustomerErrors(createPaymentMethodResult);
        creditCardDetails = createPaymentMethodResult.creditCard;

        return _usersRepository2.default.findOneByIdWithPaymentData(reqUser.id);
      }).then(function (userObj) {
        userDetails = userObj;

        return _usersRepository2.default.updateBraintreeCustomerId(userDetails, resultObject.customer.id, creditCardDetails.token);
      }).then(function () {
        return Promise.resolve({
          cardType: creditCardDetails.cardType,
          expirationDate: creditCardDetails.expirationDate,
          last4: creditCardDetails.last4
        });
      }).catch(function (err) {
        throw err;
      });
    }
  }, {
    key: 'deleteCardEntry',
    value: function deleteCardEntry(reqUser) {
      var _this2 = this;

      var userDetails = null;

      return _usersRepository2.default.findOneByIdWithPaymentData(reqUser.id).then(function (user) {
        userDetails = user;

        if (user.braintreeCustomerId && user.braintreePaymentMethodToken) {
          return _this2.gateway.paymentMethod.delete(user.braintreePaymentMethodToken);
        }
      }).then(function () {
        return _usersRepository2.default.updateBraintreeCustomerId(userDetails, null, null);
      }).catch(function (err) {
        throw err;
      });
    }
  }, {
    key: 'creditCardDetails',
    value: function creditCardDetails(reqUser) {
      var _this3 = this;

      var userDetails = null;

      return _usersRepository2.default.findOneByIdWithPaymentData(reqUser.id).then(function (user) {
        if (user.braintreeCustomerId && user.braintreePaymentMethodToken) {
          return _this3.gateway.paymentMethod.find(user.braintreePaymentMethodToken);
        }

        return Promise.resolve(null);
      }).catch(function (err) {
        throw err;
      });
    }
  }]);

  return CurrentUserPaymentsManager;
}();

exports.default = new CurrentUserPaymentsManager();