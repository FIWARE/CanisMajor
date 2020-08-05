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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var PaymentController = function () {
  function PaymentController() {
    _classCallCheck(this, PaymentController);

    this.gateway = _braintreeServices2.default.getGateway();
  }

  _createClass(PaymentController, [{
    key: 'generateToken',
    value: function generateToken(req, res, next) {
      return this.gateway.clientToken.generate().then(function (result) {
        res.render('card', { clientToken: result.clientToken });
      }).catch(function (err) {
        next(err);
      });
    }
  }]);

  return PaymentController;
}();

exports.default = new PaymentController();