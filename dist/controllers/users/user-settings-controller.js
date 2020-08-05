'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _generalErrors = require('../../services/error-services/general-errors');

var _generalErrors2 = _interopRequireDefault(_generalErrors);

var _userSettingsRepository = require('../../repositories/user-settings-repository');

var _userSettingsRepository2 = _interopRequireDefault(_userSettingsRepository);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var UserSettingsControllers = function () {
  function UserSettingsControllers() {
    _classCallCheck(this, UserSettingsControllers);
  }

  _createClass(UserSettingsControllers, [{
    key: 'getUserSettings',
    value: function getUserSettings(req, res, next) {
      return _userSettingsRepository2.default.findOneByUserId(req.params.id).then(function (userSettings) {
        if (userSettings) {
          res.jsonp(userSettings);

          return null;
        }

        return _generalErrors2.default.notFound();
      }).catch(function (err) {
        _generalErrors2.default.addErrStatus(err, 422);

        return next(err);
      });
    }
  }, {
    key: 'updateUserSettings',
    value: function updateUserSettings(req, res, next) {
      var body = JSON.parse(JSON.stringify(req.body));
      return _userSettingsRepository2.default.findOneByUserId(req.params.id).then(function (userSettings) {
        if (!userSettings) {
          return _generalErrors2.default.notFound();
        }

        return _userSettingsRepository2.default.update(userSettings, body);
      }).then(function (userSetting) {
        if (userSetting) {
          res.jsonp(userSetting);

          return null;
        }

        return _generalErrors2.default.badRequest(null);
      }).catch(function (err) {
        _generalErrors2.default.addErrStatus(err, 422);

        return next(err);
      });
    }
  }, {
    key: 'createUserSettings',
    value: function createUserSettings(req, res, next) {
      return _userSettingsRepository2.default.createNewUserSettings(req.params.id).then(function (userSetting) {
        console.log('user settings' + JSON.stringify(userSetting));
        if (userSetting) {
          console.log('userSetting is:' + JSON.stringify(userSetting));
          res.jsonp(userSetting);
          return null;
        }
        return _generalErrors2.default.badRequest(null);
      }).catch(function (err) {
        console.log('user settings err' + JSON.stringify(err));
        _generalErrors2.default.addErrStatus(err, 422);
        return next(err);
      });
    }
  }]);

  return UserSettingsControllers;
}();

exports.default = new UserSettingsControllers();