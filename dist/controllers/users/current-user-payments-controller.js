'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _currentUserPaymentsManager = require('../../managers/current-user-payments-manager');

var _currentUserPaymentsManager2 = _interopRequireDefault(_currentUserPaymentsManager);

var _generalErrors = require('../../services/error-services/general-errors');

var _generalErrors2 = _interopRequireDefault(_generalErrors);

var _paginationOptions = require('../../services/filtering-services/pagination-options');

var _paginationOptions2 = _interopRequireDefault(_paginationOptions);

var _paymentRepository = require('../../repositories/payment-repository');

var _paymentRepository2 = _interopRequireDefault(_paymentRepository);

var _objectFactory = require('../../services/filtering-services/object-factory');

var _objectFactory2 = _interopRequireDefault(_objectFactory);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var CurrentUserPaymentsControllers = function () {
  function CurrentUserPaymentsControllers() {
    _classCallCheck(this, CurrentUserPaymentsControllers);
  }

  _createClass(CurrentUserPaymentsControllers, [{
    key: 'createBraintreeCustomer',
    value: function createBraintreeCustomer(req, res, next) {
      return _currentUserPaymentsManager2.default.createBraintreeCustomer(req.user, req.body).then(function (updatedUser) {
        if (updatedUser) {
          res.jsonp(updatedUser);
        }
      }).catch(function (err) {
        _generalErrors2.default.addErrStatus(err, 400);

        next(err);
      });
    }
  }, {
    key: 'deleteBraintreeCardEntry',
    value: function deleteBraintreeCardEntry(req, res, next) {
      return _currentUserPaymentsManager2.default.deleteCardEntry(req.user).then(function (updatedUser) {
        if (updatedUser.braintreeCustomerId && !updatedUser.braintreePaymentMethodToken) {
          res.jsonp({
            success: true,
            message: 'deleted_successfully'
          });

          return null;
        }
      }).catch(function (err) {
        _generalErrors2.default.addErrStatus(err, 400);

        next(err);
      });
    }
  }, {
    key: 'creditCardDetails',
    value: function creditCardDetails(req, res, next) {
      return _currentUserPaymentsManager2.default.creditCardDetails(req.user).then(function (creditCard) {
        if (creditCard) {
          res.jsonp({
            cardType: creditCard.cardType,
            expirationDate: creditCard.expirationDate,
            last4: creditCard.last4
          });

          return null;
        }

        return _generalErrors2.default.notFound();
      }).catch(function (err) {
        _generalErrors2.default.addErrStatus(err, 400);

        next(err);
      });
    }
  }, {
    key: 'allPayments',
    value: function allPayments(req, res, next) {
      var options = _objectFactory2.default.queryOptions(req.query, ['paymentStatus']);

      return _paymentRepository2.default.findAndCountAllByFilterAndUserId(req.user.id, options).then(function (payments) {
        res.jsonp(_paginationOptions2.default.findAllResponseObject(payments, req.query));
      }).catch(function (err) {
        _generalErrors2.default.addErrStatus(err, 422);

        return next(err);
      });
    }
  }]);

  return CurrentUserPaymentsControllers;
}();

exports.default = new CurrentUserPaymentsControllers();