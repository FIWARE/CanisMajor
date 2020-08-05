'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _config = require('../../config/config.json');

var _config2 = _interopRequireDefault(_config);

var _generalErrors = require('../error-services/general-errors');

var _generalErrors2 = _interopRequireDefault(_generalErrors);

var _generalFactories = require('../factories/general-factories');

var _generalFactories2 = _interopRequireDefault(_generalFactories);

var _twilioServices = require('./twilio-services');

var _twilioServices2 = _interopRequireDefault(_twilioServices);

var _usersRepository = require('../../repositories/users-repository');

var _usersRepository2 = _interopRequireDefault(_usersRepository);

var _jwtSimple = require('jwt-simple');

var _jwtSimple2 = _interopRequireDefault(_jwtSimple);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var AuthenticateServices = function () {
  function AuthenticateServices() {
    _classCallCheck(this, AuthenticateServices);
  }

  _createClass(AuthenticateServices, [{
    key: 'createAuthResponse',
    value: function createAuthResponse(user) {
      var payload = {
        id: user.id,
        expireDate: (0, _moment2.default)().add(_config2.default.jwt.tokenAvailability, 'days').valueOf()
      };
      var token = _jwtSimple2.default.encode(payload, _config2.default.jwt.jwtSecret);
      var twilioChatToken = _twilioServices2.default.createTwilioChatToken(user);
      var twilioVideoToken = _twilioServices2.default.createTwilioVideoToken(user, null);

      _generalFactories2.default.deletePropertiesFromSequelizeResponseObject(user, user._modelOptions.sensitiveFields);

      return Promise.resolve({
        "success": true,
        token: token,
        twilioChatToken: twilioChatToken,
        twilioVideoToken: twilioVideoToken,
        user: user
      });
    }
  }, {
    key: '_getSocialMediaId',
    value: function _getSocialMediaId(response) {
      var socialMediaId = null;
      if (response && response.instagram) {
        socialMediaId = { instagramId: response.instagram.id };
      }

      if (response && response.facebook) {
        socialMediaId = { facebookId: response.facebook.id };
      }

      if (response && response.linkedin) {
        socialMediaId = { linkedinId: response.linkedin.id };
      }

      return socialMediaId;
    }
  }, {
    key: 'getAccesToken',
    value: function getAccesToken(authParams, requestDetails) {
      var _this = this;

      if (!authParams && !authParams.token) {
        return _generalErrors2.default.authenticationFailed('authentication_failed');
      }

      return requestDetails(authParams).then(function (response) {
        return _usersRepository2.default.findOneBySocialMediaId(_this._getSocialMediaId(response));
      }).then(function (user) {
        if (!user) {
          return _generalErrors2.default.authenticationFailed('authentication_failed');
        }

        return _this.createAuthResponse(user);
      });
    }
  }]);

  return AuthenticateServices;
}();

exports.default = new AuthenticateServices();