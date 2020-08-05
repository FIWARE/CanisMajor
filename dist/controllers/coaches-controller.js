'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _appRootPath = require('app-root-path');

var _appRootPath2 = _interopRequireDefault(_appRootPath);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _appointmentsRepository = require('../repositories/appointments-repository');

var _appointmentsRepository2 = _interopRequireDefault(_appointmentsRepository);

var _appointmentsManager = require('../managers/appointments-manager');

var _appointmentsManager2 = _interopRequireDefault(_appointmentsManager);

var _appointmentServices = require('../services/controller-services/appointment-services');

var _appointmentServices2 = _interopRequireDefault(_appointmentServices);

var _baseCrudController = require('./base-crud-controller');

var _baseCrudController2 = _interopRequireDefault(_baseCrudController);

var _coachesRepository = require('../repositories/coaches-repository');

var _coachesRepository2 = _interopRequireDefault(_coachesRepository);

var _coachWorkHoursRepository = require('../repositories/coach-work-hours-repository');

var _coachWorkHoursRepository2 = _interopRequireDefault(_coachWorkHoursRepository);

var _generalErrors = require('../services/error-services/general-errors');

var _generalErrors2 = _interopRequireDefault(_generalErrors);

var _events = require('../services/event-services/events');

var _events2 = _interopRequireDefault(_events);

var _objectFactory = require('../services/filtering-services/object-factory');

var _objectFactory2 = _interopRequireDefault(_objectFactory);

var _paginationOptions = require('../services/filtering-services/pagination-options');

var _paginationOptions2 = _interopRequireDefault(_paginationOptions);

var _usersRepository = require('../repositories/users-repository');

var _usersRepository2 = _interopRequireDefault(_usersRepository);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var notifications = require(_appRootPath2.default + '/src/config/notifications.json');

var CoachesController = function (_BaseCRUDController) {
  _inherits(CoachesController, _BaseCRUDController);

  function CoachesController() {
    _classCallCheck(this, CoachesController);

    var _this = _possibleConstructorReturn(this, (CoachesController.__proto__ || Object.getPrototypeOf(CoachesController)).call(this));

    _this.repository = _coachesRepository2.default;
    _this.filters = ['id', 'categoryId', 'specialityId', 'status'];
    return _this;
  }

  _createClass(CoachesController, [{
    key: 'updateCoach',
    value: function updateCoach(req, res, next) {
      var status = !req.user.isAdmin ? 'approved' : undefined;
      var updatedCoach = null;
      var coachAlreadyApproved = false;

      return _coachesRepository2.default.findOneByIdAndStatus(req.params.id, status).then(function (coach) {
        if (coach) {
          if (!req.user.isAdmin) {
            delete req.body.status;
          }
          if (coach.status == 'approved') {
            coachAlreadyApproved = true;
          }

          return _coachesRepository2.default.update(coach, req.body);
        }

        _generalErrors2.default.notFound();
      }).then(function (coach) {
        if (coach) {
          updatedCoach = coach;

          return _usersRepository2.default.findOneByCoachId(req.params.id);
        }

        return Promise.resolve(null);
      }).then(function (user) {
        if (user) {
          if (req.user.isAdmin && req.body.status == 'approved' && !coachAlreadyApproved) {
            _events2.default.emit(notifications.notificationTypes.coachRequestApproved, updatedCoach, user);
          }

          res.jsonp(updatedCoach);
        }

        return null;
      }).catch(function (err) {
        _generalErrors2.default.addErrStatus(err, 422);

        return next(err);
      });
    }
  }, {
    key: 'allFeedbacks',
    value: function allFeedbacks(req, res, next) {
      var options = _objectFactory2.default.queryOptions(req.query, []);

      return _appointmentsRepository2.default.findAndCountAllFeedbacksByCoachId(req.params.id, options).then(function (appointments) {
        res.jsonp(_paginationOptions2.default.findAllResponseObject(appointments, req.query));
      }).catch(function (err) {
        _generalErrors2.default.addErrStatus(err, 422);

        return next(err);
      });
    }
  }, {
    key: 'getCoachSettings',
    value: function getCoachSettings(req, res, next) {
      return _coachWorkHoursRepository2.default.findOneByCoachId(req.params.id).then(function (coachWorkHours) {
        if (coachWorkHours) {
          res.jsonp(coachWorkHours);

          return null;
        }

        return _generalErrors2.default.notFound();
      }).catch(function (err) {
        _generalErrors2.default.addErrStatus(err, 422);

        return next(err);
      });
    }
  }, {
    key: 'updateCoachSettings',
    value: function updateCoachSettings(req, res, next) {
      var body = JSON.parse(JSON.stringify(req.body));
      return _coachWorkHoursRepository2.default.findOneByCoachId(req.params.id).then(function (coachWorkHours) {
        if (!coachWorkHours) {
          return _generalErrors2.default.notFound();
        }

        return _coachWorkHoursRepository2.default.update(coachWorkHours, body);
      }).then(function (coachWorkHour) {
        if (coachWorkHour) {
          res.jsonp(coachWorkHour);

          return null;
        }

        return _generalErrors2.default.badRequest(null);
      }).catch(function (err) {
        _generalErrors2.default.addErrStatus(err, 422);

        return next(err);
      });
    }
  }, {
    key: 'allCoachAppointments',
    value: function allCoachAppointments(req, res, next) {
      var options = _objectFactory2.default.queryOptions(req.query, ['status']);

      return _appointmentsRepository2.default.findAndCountAllByCoachId(req.params.id, options).then(function (appointments) {
        res.jsonp(_paginationOptions2.default.findAllResponseObject(appointments, req.query));
      }).catch(function (err) {
        _generalErrors2.default.addErrStatus(err, 422);

        return next(err);
      });
    }
  }, {
    key: 'coachAvailability',
    value: function coachAvailability(req, res, next) {
      if (!req.query.timezone || !req.query.date) {
        _generalErrors2.default.badRequest('query_param_missing');
      }

      if ((0, _moment2.default)(req.query.date, "YYYY-MM-DD").isBefore(Date.now(), 'day')) {
        return _generalErrors2.default.badRequest('date_cannot_be_in_the_past');
      }

      if (!_moment2.default.tz.zone(req.query.timezone)) {
        _generalErrors2.default.badRequest('inexistent_timezone_name');
      }

      if (!(0, _moment2.default)(req.query.date, 'YYYY-MM-DD', true).isValid()) {
        _generalErrors2.default.badRequest('invalid_date_format');
      }

      return _appointmentsManager2.default.getCoachAvailability(req.params.id, req.query).then(function (hours) {
        res.jsonp(_lodash2.default.sortBy(hours, [function (hour) {
          return hour.hour;
        }]));
      }).catch(function (err) {
        _generalErrors2.default.addErrStatus(err, 400);

        return next(err);
      });
    }
  }]);

  return CoachesController;
}(_baseCrudController2.default);

exports.default = new CoachesController();