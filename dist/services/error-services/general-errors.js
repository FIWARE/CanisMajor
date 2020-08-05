'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var GeneralErrorServices = function () {
  function GeneralErrorServices() {
    _classCallCheck(this, GeneralErrorServices);
  }

  _createClass(GeneralErrorServices, [{
    key: 'addErrStatus',
    value: function addErrStatus(err, statusCode) {
      if (!err.status) {
        err.status = statusCode;
      }

      return;
    }
  }, {
    key: 'unprocessableEntity',
    value: function unprocessableEntity(message) {
      var err = new Error();
      err.status = 422;
      err.message = message;

      throw err;
    }
  }, {
    key: 'unprocessableEntityWrongFields',
    value: function unprocessableEntityWrongFields(missingFields, message) {
      var err = new Error();
      err.status = 422;
      err.errors = [];
      _lodash2.default.map(missingFields, function (field) {
        err.errors.push({
          message: message ? message : '',
          path: field
        });
      });

      throw err;
    }
  }, {
    key: 'notFound',
    value: function notFound() {
      var err = new Error();
      err.status = 404;
      err.message = 'page_not_found';

      throw err;
    }
  }, {
    key: 'forbidden',
    value: function forbidden() {
      var err = new Error();
      err.status = 403;

      throw err;
    }
  }, {
    key: 'badRequest',
    value: function badRequest(message) {
      var err = new Error();
      err.status = 400;
      if (message) {
        err.message = message;
      }

      throw err;
    }
  }, {
    key: 'authenticationFailed',
    value: function authenticationFailed(message) {
      var err = new Error();
      err.status = 401;
      err.message = message;

      throw err;
    }
  }]);

  return GeneralErrorServices;
}();

exports.default = new GeneralErrorServices();