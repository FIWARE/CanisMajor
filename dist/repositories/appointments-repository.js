'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _baseCrudRepository = require('./base-crud-repository');

var _baseCrudRepository2 = _interopRequireDefault(_baseCrudRepository);

var _generalFactories = require('../services/factories/general-factories');

var _generalFactories2 = _interopRequireDefault(_generalFactories);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var db = require("../models/index");

var AppointmentsRepository = function (_BaseCRUDRepository) {
  _inherits(AppointmentsRepository, _BaseCRUDRepository);

  function AppointmentsRepository() {
    _classCallCheck(this, AppointmentsRepository);

    var _this = _possibleConstructorReturn(this, (AppointmentsRepository.__proto__ || Object.getPrototypeOf(AppointmentsRepository)).call(this));

    _this.model = db.appointment;
    _this.createFields = ['coachId', 'userId', 'dateTime'];
    _this.updateFields = ['dateTime', 'status', 'feedback', 'rating', 'coachNotes', 'userNotes'];
    return _this;
  }

  _createClass(AppointmentsRepository, [{
    key: 'findAndCountAllFeedbacksByCoachId',
    value: function findAndCountAllFeedbacksByCoachId(coachId, options) {
      return db.appointment.findAndCountAll({
        where: {
          coachId: coachId,
          feedback: {
            $not: null
          }
        },
        order: [['createdAt', 'DESC']],
        attributes: ['id', 'rating', 'feedback'],
        include: {
          model: db.user,
          attributes: {
            exclude: db.user.options.sensitiveFields
          }
        },
        offset: options.pagination.offset,
        limit: options.pagination.limit
      });
    }
  }, {
    key: 'findAndCountAllByCoachId',
    value: function findAndCountAllByCoachId(coachId, options) {
      var whereObject = {
        coachId: coachId
      };
      if (options.filters && options.filters.status) {
        whereObject.status = options.filters.status;
      };

      return db.appointment.findAndCountAll({
        where: whereObject,
        order: [['createdAt', 'DESC']],
        offset: options.pagination.offset,
        limit: options.pagination.limit
      });
    }
  }, {
    key: 'findAndCountAllByUserId',
    value: function findAndCountAllByUserId(userId, options) {
      var whereObject = {
        userId: userId
      };
      if (options.filters && options.filters.status) {
        whereObject.status = options.filters.status;
      };

      if (options.filters && options.filters.state) {
        whereObject.status = 'accepted';
        if (options.filters.state == 'finished') {
          whereObject.$or = [{
            dateTime: {
              $lte: (0, _moment2.default)().subtract(1, 'hours')
            }
          }, {
            endingTime: {
              $ne: null
            }
          }];
        }

        if (options.filters.state == 'upcoming') {
          whereObject.dateTime = {
            $gte: (0, _moment2.default)().subtract(1, 'hours')
          };
          whereObject.endingTime = null;
        }
      }

      return db.appointment.findAndCountAll({
        where: whereObject,
        order: [['createdAt', 'DESC']],
        offset: options.pagination.offset,
        limit: options.pagination.limit
      });
    }
  }, {
    key: 'findAllByDate',
    value: function findAllByDate(startDate, endDate) {
      return db.appointment.findAll({
        where: {
          status: {
            $not: ['cancelled']
          },
          dateTime: {
            $between: [startDate, endDate]
          }
        },
        order: [['createdAt', 'DESC']]
      });
    }
  }, {
    key: 'findAllByDateCoachId',
    value: function findAllByDateCoachId(startDate, endDate, coachId) {
      return db.appointment.findAll({
        where: {
          coachId: coachId,
          status: {
            $not: ['cancelled']
          },
          dateTime: {
            $between: [startDate, endDate]
          }
        },
        order: [['createdAt', 'DESC']]
      });
    }
  }, {
    key: 'findOneByIdAndStatus',
    value: function findOneByIdAndStatus(appointmentId, statuses, options) {
      if (!options) {
        options = {};
      }

      return db.appointment.findOne({
        where: {
          id: appointmentId,
          status: statuses
        },
        transaction: options.transaction ? options.transaction : undefined
      });
    }
  }, {
    key: 'create',
    value: function create(appointmentData, coach, options) {
      return db.appointment.create({
        coachId: appointmentData.coachId,
        userId: appointmentData.userId,
        dateTime: _moment2.default.tz(appointmentData.dateTime, 'YYYY-MM-DD HH:mm', appointmentData.timezone).utc(),
        hourlyRate: coach.hourlyRate
      }, options);
    }
  }, {
    key: 'updateStatus',
    value: function updateStatus(appointment, status, options) {
      return appointment.updateAttributes({
        status: status
      }, options);
    }
  }, {
    key: 'updateNotes',
    value: function updateNotes(appointment, notes, notesType) {
      return appointment.updateAttributes(_defineProperty({}, notesType, notes));
    }
  }, {
    key: 'updateEndingTime',
    value: function updateEndingTime(appointment) {
      return appointment.updateAttributes({
        endingTime: Date.now()
      });
    }
  }, {
    key: 'updateFeedback',
    value: function updateFeedback(appointment, reqBody) {
      return appointment.updateAttributes({
        feedback: reqBody.feedback ? reqBody.feedback : null,
        rating: reqBody.rating ? reqBody.rating : appointment.rating
      });
    }
  }]);

  return AppointmentsRepository;
}(_baseCrudRepository2.default);

exports.default = new AppointmentsRepository();