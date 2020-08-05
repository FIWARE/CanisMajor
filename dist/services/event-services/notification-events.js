'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _appRootPath = require('app-root-path');

var _appRootPath2 = _interopRequireDefault(_appRootPath);

var _emailServices = require('../email-services/email-services');

var _emailServices2 = _interopRequireDefault(_emailServices);

var _notificationsRepository = require('../../repositories/notifications-repository');

var _notificationsRepository2 = _interopRequireDefault(_notificationsRepository);

var _events = require('./events');

var _events2 = _interopRequireDefault(_events);

var _userSettingsRepository = require('../../repositories/user-settings-repository');

var _userSettingsRepository2 = _interopRequireDefault(_userSettingsRepository);

var _usersRepository = require('../../repositories/users-repository');

var _usersRepository2 = _interopRequireDefault(_usersRepository);

var _coachesRepository = require('../../repositories/coaches-repository');

var _coachesRepository2 = _interopRequireDefault(_coachesRepository);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var notifications = require(_appRootPath2.default + '/src/config/notifications.json');

var NotificationLiseners = function () {
  function NotificationLiseners() {
    _classCallCheck(this, NotificationLiseners);
  }

  _createClass(NotificationLiseners, [{
    key: 'notificationListener',
    value: function notificationListener() {
      _events2.default.on(notifications.notificationTypes.appointmentCreated, function (appointment, user) {
        return _events2.default.emit(notifications.create, user, appointment, 'appointment', notifications.notificationTypes.appointmentCreated);
      });

      _events2.default.on(notifications.notificationTypes.appointmentCreated, function (appointment) {
        return _usersRepository2.default.findOneByCoachId(appointment.coachId).then(function (user) {
          return _events2.default.emit(notifications.create, user, appointment, 'appointment', notifications.notificationTypes.appointmentRequest);
        }).catch(function (err) {
          throw err;
        });
      });

      _events2.default.on(notifications.notificationTypes.appointmentApproved, function (appointment, user) {
        return _events2.default.emit(notifications.create, user, appointment, 'appointment', notifications.notificationTypes.appointmentApproved);
      });

      _events2.default.on(notifications.notificationTypes.appointmentCancelled, function (appointment, user) {
        return _events2.default.emit(notifications.create, user, appointment, 'appointment', notifications.notificationTypes.appointmentCancelled);
      });

      _events2.default.on(notifications.notificationTypes.coachRequestApproved, function (coach, user) {
        return _events2.default.emit(notifications.create, user, coach, 'coach', notifications.notificationTypes.coachRequestApproved);
      });

      _events2.default.on(notifications.notificationTypes.appointmentFeedback, function (appointment) {
        return _coachesRepository2.default.findOneById(appointment.coachId).then(function (coach) {
          if (!coach) {
            return;
          }

          return _events2.default.emit(notifications.create, coach.user, appointment, 'appointment', notifications.notificationTypes.appointmentFeedback);
        });
      });

      _events2.default.on(notifications.create, function (user, updatedObject, updatedObjectType, notificationType) {
        var notificationDetails = null;

        return _notificationsRepository2.default.create({
          userId: user.id,
          objectId: updatedObject.id,
          objectType: updatedObjectType,
          notificationType: notificationType
        }).then(function (notification) {
          notificationDetails = notification;

          return _userSettingsRepository2.default.findOneByUserId(user.id);
        }).then(function (userSettings) {
          if (userSettings && !userSettings.emailNotifications) {
            return Promise.resolve(null);
          }
          return _emailServices2.default.sendNotificationEmail(user, updatedObject, notificationDetails);
        }).catch(function (err) {
          throw err;
        });
      });
    }
  }]);

  return NotificationLiseners;
}();

exports.default = new NotificationLiseners();