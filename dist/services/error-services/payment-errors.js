"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var PaymentErrorServices = function () {
  function PaymentErrorServices() {
    _classCallCheck(this, PaymentErrorServices);
  }

  _createClass(PaymentErrorServices, [{
    key: "createBraintreeCustomerErrors",
    value: function createBraintreeCustomerErrors(result) {
      if (result.errors) {
        var err = new Error();
        var deepErrors = result.errors.deepErrors();
        err.message = deepErrors[0] ? deepErrors[0].message : undefined;
        err.processorResponseCode = deepErrors[0] ? deepErrors[0].code : undefined;

        throw err;
      }

      return null;
    }
  }, {
    key: "createTransactionErrors",
    value: function createTransactionErrors(result) {
      if (result.errors) {
        var err = new Error();
        if (result.transaction) {
          err.message = result.message;
          err.processorResponseCode = result.transaction.processorResponseCode ? result.transaction.processorResponseCode : undefined;

          throw err;
        }
        err.message = result.message;

        throw err;
      }

      return null;
    }
  }]);

  return PaymentErrorServices;
}();

exports.default = new PaymentErrorServices();