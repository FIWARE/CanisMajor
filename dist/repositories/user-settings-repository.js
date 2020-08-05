"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _generalFactories = require("../services/factories/general-factories");

var _generalFactories2 = _interopRequireDefault(_generalFactories);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var db = require("../models/index");

var UserSettingsRepository = function () {
  function UserSettingsRepository() {
    _classCallCheck(this, UserSettingsRepository);
  }

  _createClass(UserSettingsRepository, [{
    key: "findOneByUserId",
    value: function findOneByUserId(userId) {
      return db.userSetting.findOne({
        where: {
          userId: userId
        }
      });
    }
  }, {
    key: "createNewUserSettings",
    value: function createNewUserSettings(userId) {
      return db.userSettings.create({
        userId: userId,
        notificationNewMessage: true,
        notificationAppointmentAccepted: false,
        notificationAppointmentCancelled: false,
        emailNotifications: true,
        emailOffers: false,
        calendarSync: false
      });
    }
  }, {
    key: "update",
    value: function update(userSettings, userSettingsObject) {
      return userSettings.updateAttributes({
        notificationNewMessage: _generalFactories2.default.changeIfHasProperty(userSettings, userSettingsObject, "notificationNewMessage"),
        notificationAppointmentAccepted: _generalFactories2.default.changeIfHasProperty(userSettings, userSettingsObject, "notificationAppointmentAccepted"),
        notificationAppointmentCancelled: _generalFactories2.default.changeIfHasProperty(userSettings, userSettingsObject, "notificationAppointmentCancelled"),
        emailNotifications: _generalFactories2.default.changeIfHasProperty(userSettings, userSettingsObject, "emailNotifications"),
        emailOffers: _generalFactories2.default.changeIfHasProperty(userSettings, userSettingsObject, "emailOffers"),
        calendarSync: _generalFactories2.default.changeIfHasProperty(userSettings, userSettingsObject, "calendarSync")
      });
    }
  }]);

  return UserSettingsRepository;
}();

exports.default = new UserSettingsRepository();