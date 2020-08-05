'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _momentTimezone = require('moment-timezone');

var _momentTimezone2 = _interopRequireDefault(_momentTimezone);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var AppointmentServices = function () {
  function AppointmentServices() {
    _classCallCheck(this, AppointmentServices);
  }

  _createClass(AppointmentServices, [{
    key: '_createHourFromInteger',
    value: function _createHourFromInteger(integer) {
      if (integer < 0 || integer > 24) {
        return null;
      }
      if (integer < 10) {
        return '0' + integer.toString() + ':00:00';
      }

      return integer.toString() + ':00:00';
    }
  }, {
    key: '_getOffsetByTimezoneName',
    value: function _getOffsetByTimezoneName(timezone) {
      return parseInt(_momentTimezone2.default.tz(timezone).format('Z'));
    }
  }, {
    key: '_addTimezoneOffset',
    value: function _addTimezoneOffset(coachWorkHours, timezone) {
      var timeZoneDiff = this._getOffsetByTimezoneName(timezone);

      return {
        morningSessionStart: coachWorkHours.morningSessionStart + timeZoneDiff,
        morningSessionEnd: coachWorkHours.morningSessionEnd + timeZoneDiff,
        afternoonSessionStart: coachWorkHours.afternoonSessionStart + timeZoneDiff,
        afternoonSessionEnd: coachWorkHours.afternoonSessionEnd + timeZoneDiff
      };
    }
  }, {
    key: '_substractTimeZoneOffset',
    value: function _substractTimeZoneOffset(coachWorkHours, timezone) {
      var timeZoneDiff = this._getOffsetByTimezoneName(timezone);

      return {
        morningSessionStart: coachWorkHours.morningSessionStart - timeZoneDiff,
        morningSessionEnd: coachWorkHours.morningSessionEnd - timeZoneDiff,
        afternoonSessionStart: coachWorkHours.afternoonSessionStart - timeZoneDiff,
        afternoonSessionEnd: coachWorkHours.afternoonSessionEnd - timeZoneDiff
      };
    }
  }, {
    key: '_getProgramIntervals',
    value: function _getProgramIntervals(program, sessionName) {
      if (program[sessionName] < 1) {
        return 24 + program[sessionName];
      } else {
        return program[sessionName] > 24 ? program[sessionName] - 24 : program[sessionName];
      }
    }
  }, {
    key: '_getNewProgram',
    value: function _getNewProgram(program) {
      return {
        morningSessionStart: this._getProgramIntervals(program, 'morningSessionStart'),
        morningSessionEnd: this._getProgramIntervals(program, 'morningSessionEnd'),
        afternoonSessionStart: this._getProgramIntervals(program, 'afternoonSessionStart'),
        afternoonSessionEnd: this._getProgramIntervals(program, 'afternoonSessionEnd')
      };
    }
  }, {
    key: 'makeUnavailablePassedHoursFromProgram',
    value: function makeUnavailablePassedHoursFromProgram(programs) {
      return Promise.all(_lodash2.default.map(programs, function (program) {
        if ((0, _momentTimezone2.default)(program.hour).isBefore(Date.now())) {
          program.available = false;
        }

        return program;
      }));
    }
  }, {
    key: 'createDate',
    value: function createDate(day, hourAsInteger, timezone) {
      return _momentTimezone2.default.tz(day + 'T' + this._createHourFromInteger(hourAsInteger), timezone).format();
    }
  }, {
    key: 'createAppointmentsArray',
    value: function createAppointmentsArray(appointments, timezone) {
      return Promise.all(_lodash2.default.map(appointments, function (appointment) {
        return _momentTimezone2.default.tz(appointment.dataValues.dateTime, timezone).clone().format();
      }));
    }
  }, {
    key: 'changeHourIntervals',
    value: function changeHourIntervals(programArray, startHour, endHour) {
      if (startHour > endHour) {
        for (var i = 0; i < endHour; i++) {
          programArray.push(i);
        }
        for (var j = startHour; j < 24; j++) {
          programArray.push(j);
        }
      } else {
        for (var k = startHour; k < endHour; k++) {
          programArray.push(k);
        }
      }
    }
  }, {
    key: 'createWorkHoursArray',
    value: function createWorkHoursArray(newProgram) {
      var programHoursArray = [];
      this.changeHourIntervals(programHoursArray, newProgram.morningSessionStart, newProgram.morningSessionEnd);
      this.changeHourIntervals(programHoursArray, newProgram.afternoonSessionStart, newProgram.afternoonSessionEnd);

      return _lodash2.default.uniq(programHoursArray);
    }
  }, {
    key: 'createFullProgram',
    value: function createFullProgram(programHoursArray, program, day, timezone) {
      var fullProgram = [];
      for (var i = 0; i < 24; i++) {
        if (_lodash2.default.includes(programHoursArray, i)) {
          fullProgram.push({
            hour: this.createDate(day, i, timezone),
            available: true,
            outsideWorkHour: false
          });
        } else {
          fullProgram.push({
            hour: this.createDate(day, i, timezone),
            available: program.acceptOutsideWorkingHours ? true : false,
            outsideWorkHour: true
          });
        }
      }

      return fullProgram;
    }
  }, {
    key: 'getOneHourFromProgram',
    value: function getOneHourFromProgram(program, dateTime, timezone) {
      var neededHour = _momentTimezone2.default.tz(dateTime, timezone).clone().format();

      return Promise.resolve(_lodash2.default.find(program, function (hour) {
        return hour.hour == neededHour;
      }));
    }
  }, {
    key: 'getProgram',
    value: function getProgram(program, timezone, day) {
      var newHours = this._substractTimeZoneOffset(program, program.timeZone);
      newHours = this._addTimezoneOffset(newHours, timezone);
      var newProgram = this._getNewProgram(newHours);
      return this.createFullProgram(this.createWorkHoursArray(newProgram), program, day, timezone);
    }
    /**
     * Compares the program for the day with the apointments from that day.
     * @param  {Array} programs     The full working program of the coach for the day
     * @param  {Array} appointments Array with the booked hours of the coach from the day
     * @param  {String} timezone    Name of the timezone
     * @return {Array}              An array with the full program of the coach for 1 day, with the appointments on it.
     */

  }, {
    key: 'createDailySchedule',
    value: function createDailySchedule(programs, appointments, timezone) {
      return Promise.all(_lodash2.default.map(programs, function (program) {
        if (_lodash2.default.includes(appointments, program.hour)) {
          return {
            startingHour: (0, _momentTimezone2.default)(program.hour).tz(timezone).format('HH:mm'),
            endingHour: (0, _momentTimezone2.default)(program.hour).add(1, 'hour').tz(timezone).format('HH:mm'),
            available: false,
            outsideWorkHour: program.outsideWorkHour
          };
        }

        return {
          startingHour: (0, _momentTimezone2.default)(program.hour).tz(timezone).format('HH:mm'),
          endingHour: (0, _momentTimezone2.default)(program.hour).add(1, 'hour').tz(timezone).format('HH:mm'),
          available: program.available,
          outsideWorkHour: program.outsideWorkHour
        };
      }));
    }
  }]);

  return AppointmentServices;
}();

exports.default = new AppointmentServices();