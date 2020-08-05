'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _sequelize = require('../sequelize');

var _sequelize2 = _interopRequireDefault(_sequelize);

var _appointmentsRepository = require('../repositories/appointments-repository');

var _appointmentsRepository2 = _interopRequireDefault(_appointmentsRepository);

var _appointmentServices = require('../services/controller-services/appointment-services');

var _appointmentServices2 = _interopRequireDefault(_appointmentServices);

var _coachWorkHoursRepository = require('../repositories/coach-work-hours-repository');

var _coachWorkHoursRepository2 = _interopRequireDefault(_coachWorkHoursRepository);

var _coachesRepository = require('../repositories/coaches-repository');

var _coachesRepository2 = _interopRequireDefault(_coachesRepository);

var _dateTimeValidators = require('../services/validators/date-time-validators');

var _dateTimeValidators2 = _interopRequireDefault(_dateTimeValidators);

var _generalErrors = require('../services/error-services/general-errors');

var _generalErrors2 = _interopRequireDefault(_generalErrors);

var _usersRepository = require('../repositories/users-repository');

var _usersRepository2 = _interopRequireDefault(_usersRepository);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var AppointmentsManager = function () {
  function AppointmentsManager() {
    _classCallCheck(this, AppointmentsManager);
  }

  _createClass(AppointmentsManager, [{
    key: 'getCoachAvailability',
    value: function getCoachAvailability(coachId, queryParams) {
      var programs = null;
      var startDate = _appointmentServices2.default.createDate(queryParams.date, 0, queryParams.timezone);
      var endDate = (0, _moment2.default)(startDate).add(1, 'days').subtract(1, 'second').format();

      return _coachWorkHoursRepository2.default.findOneByCoachId(coachId).then(function (coachWorkHours) {
        if (coachWorkHours) {
          return _appointmentServices2.default.getProgram(coachWorkHours.dataValues, queryParams.timezone, queryParams.date);
        }

        return _generalErrors2.default.notFound();
      }).then(function (newProgram) {
        if (newProgram) {
          return _appointmentServices2.default.makeUnavailablePassedHoursFromProgram(newProgram);
        }
      }).then(function (newProgram) {
        programs = newProgram;

        return _appointmentsRepository2.default.findAllByDateCoachId(startDate, endDate, coachId);
      }).then(function (appointments) {
        return _appointmentServices2.default.createAppointmentsArray(appointments, queryParams.timezone);
      }).then(function (appointmentsByTimezone) {
        return _appointmentServices2.default.createDailySchedule(programs, appointmentsByTimezone, queryParams.timezone);
      });
    }
  }, {
    key: 'createAppointment',
    value: function createAppointment(requestBody, requestUser) {
      _dateTimeValidators2.default.validateCreateAppointmentFields(requestBody.timezone, requestBody.dateTime);
      var startDate = _moment2.default.tz(requestBody.dateTime, 'YYYY-MM-DD HH:mm', requestBody.timezone).utc().format();
      var endDate = (0, _moment2.default)(startDate).add(1, 'hour').subtract(10, 'second').format();

      return _sequelize2.default.transaction(function (t) {
        return Promise.all([_usersRepository2.default.findOneByIdWithPaymentData(requestBody.userId), _coachesRepository2.default.findOneById(requestBody.coachId)]).then(function (_ref) {
          var _ref2 = _slicedToArray(_ref, 2),
              userWithPaymentDetails = _ref2[0],
              coach = _ref2[1];

          if (!userWithPaymentDetails) {
            return _generalErrors2.default.badRequest('wrong_user_id');
          }
          // Changes tobe Undo
          // if(coach.hourlyRate > 0 && (
          //   !userWithPaymentDetails.braintreeCustomerId ||
          //   !userWithPaymentDetails.braintreePaymentMethodToken
          // )) {
          //   return generalErrors.unprocessableEntity('card_not_found');
          // }
          return _coachWorkHoursRepository2.default.findOneByCoachId(requestBody.coachId);
        }).then(function (coachWorkHours) {
          if (coachWorkHours) {
            return _appointmentServices2.default.getProgram(coachWorkHours.dataValues, requestBody.timezone, (0, _moment2.default)(requestBody.dateTime).format('YYYY-MM-DD'));
          }

          return _generalErrors2.default.unprocessableEntity('coach_not_found');
        }).then(function (newProgram) {
          return _appointmentServices2.default.getOneHourFromProgram(newProgram, requestBody.dateTime, requestBody.timezone);
        }).then(function (neededHour) {
          if (neededHour && neededHour.available) {
            return _appointmentsRepository2.default.findAllByDateCoachId(startDate, endDate, requestBody.coachId, null);
          }

          return _generalErrors2.default.unprocessableEntity('coach_not_available');
        }).then(function (appointment) {
          if (appointment.length > 0) {
            if (appointment.length == 1 && appointment[0].userId == requestUser.id) {
              return _generalErrors2.default.unprocessableEntity('duplicate_request');
            }

            return _generalErrors2.default.unprocessableEntity('coach_not_available');
          }

          return _coachesRepository2.default.findOneById(requestBody.coachId);
        }).then(function (coach) {
          return _appointmentsRepository2.default.create(requestBody, coach, { transaction: t });
        });
      });
    }
  }, {
    key: 'acceptAppointment',
    value: function acceptAppointment(reqParams, reqUser, t) {
      return _appointmentsRepository2.default.findOneByIdAndStatus(reqParams.id, ['pending'], { transaction: t }).then(function (appointment) {
        if (!appointment) {
          _generalErrors2.default.notFound();
        }
        if (appointment.coachId != reqUser.coach.id) {
          _generalErrors2.default.notFound();
        }

        return _appointmentsRepository2.default.updateStatus(appointment, 'accepted', {
          transaction: t,
          lock: t.LOCK.UPDATE
        });
      });
    }
  }]);

  return AppointmentsManager;
}();

exports.default = new AppointmentsManager();