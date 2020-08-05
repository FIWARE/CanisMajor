'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ErrorParsers = function () {
  function ErrorParsers() {
    _classCallCheck(this, ErrorParsers);
  }

  _createClass(ErrorParsers, [{
    key: 'sequelizeErrorParser',
    value: function sequelizeErrorParser(sequelizeError) {
      var responseError = {};
      if (!sequelizeError.errors) {
        sequelizeError.success = false;
        if (sequelizeError.message) {
          responseError.message = sequelizeError.message;
          responseError.success = false;
          return responseError;
        }
        return sequelizeError;
      }

      sequelizeError.errors.forEach(function (value) {
        if (value.path == 'passwordNeeded') {
          value.path = 'password';
          value.message = '';
        }

        if (value.path == 'lower(username::text)') {
          value.path = 'username';
          value.message = 'value_already_used';
        }

        if (value.type == 'notNull Violation') {
          value.message = '';
        }

        responseError[value.path] = value.message;
      });
      return responseError;
    }
  }, {
    key: 'multerErrorParser',
    value: function multerErrorParser(errorObject) {
      var responseError = {
        success: false,
        message: errorObject.code,
        status: 422
      };

      if (errorObject.statusCode) {
        responseError.status = errorObject.statusCode;
      }

      if (errorObject.code == "LIMIT_FILE_COUNT") {
        responseError.message = "too_many_files";
      }

      if (errorObject.code == "LIMIT_FILE_SIZE") {
        responseError.message = "file_size_exceeded";
      }

      return responseError;
    }
  }]);

  return ErrorParsers;
}();

exports.default = new ErrorParsers();