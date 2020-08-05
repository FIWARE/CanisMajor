'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _generalErrors = require('../services/error-services/general-errors');

var _generalErrors2 = _interopRequireDefault(_generalErrors);

var _emailServices = require('../services/email-services/email-services');

var _emailServices2 = _interopRequireDefault(_emailServices);

var _generalFactories = require('../services/factories/general-factories');

var _generalFactories2 = _interopRequireDefault(_generalFactories);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var SendEmailController = function () {
  function SendEmailController() {
    _classCallCheck(this, SendEmailController);
  }

  _createClass(SendEmailController, [{
    key: 'sendEmail',
    value: function sendEmail(req, res, next) {
      _generalFactories2.default.verifyObjectHasFields(req.body, ['subject', 'message']);

      return _emailServices2.default.sendEmailToAdmin(req.body).then(function () {
        res.jsonp({
          success: true,
          message: "email_sent_successfully"
        });
      }).catch(function (err) {
        _generalErrors2.default.addErrStatus(err, 422);

        return next(err);
      });
    }
  }]);

  return SendEmailController;
}();

exports.default = new SendEmailController();