'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _appRootPath = require('app-root-path');

var _appRootPath2 = _interopRequireDefault(_appRootPath);

var _appointmentsManager = require('../managers/appointments-manager');

var _appointmentsManager2 = _interopRequireDefault(_appointmentsManager);

var _appointmentsRepository = require('../repositories/appointments-repository');

var _appointmentsRepository2 = _interopRequireDefault(_appointmentsRepository);

var _baseCrudController = require('./base-crud-controller');

var _baseCrudController2 = _interopRequireDefault(_baseCrudController);

var _generalErrors = require('../services/error-services/general-errors');

var _generalErrors2 = _interopRequireDefault(_generalErrors);

var _generalFactories = require('../services/factories/general-factories');

var _generalFactories2 = _interopRequireDefault(_generalFactories);

var _objectFactory = require('../services/filtering-services/object-factory');

var _objectFactory2 = _interopRequireDefault(_objectFactory);

var _paginationOptions = require('../services/filtering-services/pagination-options');

var _paginationOptions2 = _interopRequireDefault(_paginationOptions);

var _braintreeServices = require('../services/payment-services/braintree-services');

var _braintreeServices2 = _interopRequireDefault(_braintreeServices);

var _events = require('../services/event-services/events');

var _events2 = _interopRequireDefault(_events);

var _sequelize = require('../sequelize');

var _sequelize2 = _interopRequireDefault(_sequelize);

var _usersRepository = require('../repositories/users-repository');

var _usersRepository2 = _interopRequireDefault(_usersRepository);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var notifications = require(_appRootPath2.default + '/src/config/notifications.json');

var AppointmentsController = function (_BaseCRUDController) {
  _inherits(AppointmentsController, _BaseCRUDController);

  function AppointmentsController() {
    _classCallCheck(this, AppointmentsController);

    var _this = _possibleConstructorReturn(this, (AppointmentsController.__proto__ || Object.getPrototypeOf(AppointmentsController)).call(this));

    _this.repository = _appointmentsRepository2.default;
    _this.filters = ['coachId', 'userId', 'status'];
    return _this;
  }

  _createClass(AppointmentsController, [{
    key: 'oneSpecifiedAppointment',
    value: function oneSpecifiedAppointment(req, res, next) {
      return _appointmentsRepository2.default.findOneById(req.params.id).then(function (appointment) {
        if (appointment && (appointment.userId == req.user.id || req.user.coach && appointment.coachId == req.user.coach.id || req.user.isAdmin)) {
          res.jsonp(appointment);

          return null;
        }

        _generalErrors2.default.notFound();
      }).catch(function (err) {
        _generalErrors2.default.addErrStatus(err, 400);

        return next(err);
      });
    }
  }, {
    key: 'createAppointment',
    value: function createAppointment(req, res, next) {
      if (req.body.userId && req.body.userId != req.user.id) {
        return _generalErrors2.default.badRequest('wrong_user_id');
      }

      return _appointmentsManager2.default.createAppointment(req.body, req.user).then(function (createdAppointment) {
        if (createdAppointment) {
          _events2.default.emit(notifications.notificationTypes.appointmentCreated, createdAppointment, req.user);

          res.jsonp(createdAppointment);
        }
      }).catch(function (err) {
        _generalErrors2.default.addErrStatus(err, 422);

        return next(err);
      });
    }
  }, {
    key: 'cancelAppointment',
    value: function cancelAppointment(req, res, next) {
      var appointmentDetails = null;

      return _appointmentsRepository2.default.findOneByIdAndStatus(req.params.id, ['pending']).then(function (appointment) {
        if (!appointment) {
          _generalErrors2.default.notFound();
        }
        if (appointment.userId != req.user.id && appointment.coachId != req.user.coach.id) {
          _generalErrors2.default.notFound();
        }

        return _appointmentsRepository2.default.updateStatus(appointment, 'cancelled');
      }).then(function (appointment) {
        if (!appointment) {
          _generalErrors2.default.badRequest();
        }
        appointmentDetails = appointment;

        return _usersRepository2.default.findOneById(appointment.userId);
      }).then(function (user) {
        if (!user) {
          _generalErrors2.default.badRequest();
        }
        _events2.default.emit(notifications.notificationTypes.appointmentCancelled, appointmentDetails, user);

        res.jsonp(appointmentDetails);
      }).catch(function (err) {
        _generalErrors2.default.addErrStatus(err, 400);

        return next(err);
      });
    }
  }, {
    key: 'acceptAppointment',
    value: function acceptAppointment(req, res, next) {
      var appointmentDetails = null;
      var userDetails = null;

      return _sequelize2.default.transaction().then(function (t) {
        return _appointmentsManager2.default.acceptAppointment(req.params, req.user, t).then(function (appointment) {
          if (!appointment) {
            _generalErrors2.default.badRequest();
          }
          appointmentDetails = appointment;

          return _usersRepository2.default.findOneById(appointment.userId);
        }).then(function (user) {
          if (!user) {
            _generalErrors2.default.badRequest();
          }
          userDetails = user;
          return user;
          //disabled for payment
          // return paymentServices.createCheckout(appointmentDetails.id);
        }).then(function () {
          _events2.default.emit(notifications.notificationTypes.appointmentApproved, appointmentDetails, userDetails);

          return t.commit();
        }).then(function () {
          res.jsonp(appointmentDetails);
        }).catch(function (err) {
          _generalErrors2.default.addErrStatus(err, 400);
          t.rollback();

          throw err;
        });
      }).catch(function (err) {
        if (appointmentDetails) {
          _appointmentsRepository2.default.updateStatus(appointmentDetails, 'cancelled');

          _events2.default.emit(notifications.notificationTypes.appointmentCancelled, appointmentDetails, userDetails);
        }
        _generalErrors2.default.addErrStatus(err, 400);

        return next(err);
      });
    }
  }, {
    key: 'endAppointment',
    value: function endAppointment(req, res, next) {
      return _appointmentsRepository2.default.findOneByIdAndStatus(req.params.id, 'accepted').then(function (appointment) {
        if (!appointment) {
          _generalErrors2.default.notFound();
        }

        if (req.user.coach) {
          if (appointment.coachId != req.user.coach.id && appointment.userId != req.user.id) {
            _generalErrors2.default.notFound();
          }
        } else {
          if (appointment.userId != req.user.id) {
            _generalErrors2.default.notFound();
          }
        }

        if (!(0, _moment2.default)().isBetween((0, _moment2.default)(appointment.dateTime), (0, _moment2.default)(appointment.dateTime).add(1, 'hours')) || appointment.endingTime) {
          _generalErrors2.default.notFound();
        }

        return _appointmentsRepository2.default.updateEndingTime(appointment);
      }).then(function (appointment) {
        res.jsonp(appointment);
      }).catch(function (err) {
        _generalErrors2.default.addErrStatus(err, 400);

        return next(err);
      });
    }
  }, {
    key: 'addNotes',
    value: function addNotes(req, res, next) {
      var notesType = 'userNotes';

      return _appointmentsRepository2.default.findOneByIdAndStatus(req.params.id, ['accepted']).then(function (appointment) {
        if (!appointment) {
          _generalErrors2.default.notFound();
        }
        if (appointment.userId != req.user.id && appointment.coachId != req.user.coach.id) {
          _generalErrors2.default.notFound();
        }

        if (req.user.coach && appointment.coachId == req.user.coach.id) {
          notesType = 'coachNotes';
        }

        return _appointmentsRepository2.default.updateNotes(appointment, req.body.notes, notesType);
      }).then(function (appointment) {
        if (!appointment) {
          _generalErrors2.default.badRequest();
        }

        res.jsonp(appointment);
      }).catch(function (err) {
        _generalErrors2.default.addErrStatus(err, 400);

        return next(err);
      });
    }
  }, {
    key: 'addFeedback',
    value: function addFeedback(req, res, next) {
      return _appointmentsRepository2.default.findOneByIdAndStatus(req.params.id, ['accepted']).then(function (appointment) {
        if (!appointment) {
          _generalErrors2.default.notFound();
        }
        if (appointment.userId != req.user.id) {
          _generalErrors2.default.notFound();
        }
        if (appointment.feedback && req.body.feedback) {
          return _generalErrors2.default.unprocessableEntity('appointment_has_feedback');
        }
        if (appointment.rating) {
          delete req.body.rating;
        } else {
          _generalFactories2.default.verifyObjectHasFields(req.body, ['rating']);
        }
        if ((0, _moment2.default)(appointment.dateTime).isAfter(Date.now())) {
          return _generalErrors2.default.unprocessableEntity('appointment_not_started_yet');
        }

        return _appointmentsRepository2.default.updateFeedback(appointment, req.body);
      }).then(function (appointment) {
        if (!appointment) {
          _generalErrors2.default.badRequest();
        }

        _events2.default.emit(notifications.notificationTypes.appointmentFeedback, appointment);

        res.jsonp(appointment);
      }).catch(function (err) {
        _generalErrors2.default.addErrStatus(err, 400);

        return next(err);
      });
    }
  }]);

  return AppointmentsController;
}(_baseCrudController2.default);

exports.default = new AppointmentsController();