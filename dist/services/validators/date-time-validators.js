'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _generalErrors = require('../error-services/general-errors');

var _generalErrors2 = _interopRequireDefault(_generalErrors);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var DateTimeValidators = function () {
  function DateTimeValidators() {
    _classCallCheck(this, DateTimeValidators);
  }

  _createClass(DateTimeValidators, [{
    key: 'validateCreateAppointmentFields',
    value: function validateCreateAppointmentFields(timezone, dateTime) {
      // timezone is required
      if (!timezone) {
        return _generalErrors2.default.unprocessableEntityWrongFields(['timezone'], null);
      }
      // verify if timezone name is correct
      if (!_moment2.default.tz.zone(timezone)) {
        return _generalErrors2.default.unprocessableEntityWrongFields(['timezone'], 'inexistent_timezone_name');
      }
      // verify if date-time is in the past
      if ((0, _moment2.default)(dateTime).isBefore(Date.now())) {
        return _generalErrors2.default.unprocessableEntity('date_cannot_be_in_the_past');
      }
      // verify if time is at exact hour
      if ((0, _moment2.default)(dateTime).millisecond() != 0 || (0, _moment2.default)(dateTime).second() != 0 || (0, _moment2.default)(dateTime).minute() != 0) {
        return _generalErrors2.default.unprocessableEntity('wrong_time_format');
      }
    }
  }]);

  return DateTimeValidators;
}();

exports.default = new DateTimeValidators();