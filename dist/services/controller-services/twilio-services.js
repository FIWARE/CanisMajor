'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _config = require('../../config/config.json');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var twilio = require('twilio');

var TwilioServices = function () {
  function TwilioServices() {
    _classCallCheck(this, TwilioServices);
  }

  _createClass(TwilioServices, [{
    key: 'createTwilioChatToken',
    value: function createTwilioChatToken(user) {
      var AccessToken = twilio.jwt.AccessToken;
      var ChatGrant = AccessToken.ChatGrant;
      // Used specifically for creating Chat tokens
      var appName = 'nLIGHn';
      var identity = user.id.toString();
      var endpointId = appName + ':' + identity;

      var chatGrant = new ChatGrant({
        serviceSid: _config2.default.twilio.serviceSid,
        endpointId: endpointId
      });

      var token = new AccessToken(_config2.default.twilio.accountSid, _config2.default.twilio.apiKey, _config2.default.twilio.apiSecret);
      token.addGrant(chatGrant);
      token.identity = identity;

      return token.toJwt();
    }
  }, {
    key: 'createTwilioVideoToken',
    value: function createTwilioVideoToken(user, room) {
      var AccessToken = twilio.jwt.AccessToken;
      var VideoGrant = AccessToken.VideoGrant;
      var identity = user.id.toString();

      // Create Video Grant
      var videoGrant = new VideoGrant();
      if (room) {
        videoGrant.room = room;
      }
      var token = new AccessToken(_config2.default.twilio.accountSid, _config2.default.twilio.apiKey, _config2.default.twilio.apiSecret);
      token.addGrant(videoGrant);
      token.identity = identity;

      return token.toJwt();
    }
  }, {
    key: 'createChatUser',
    value: function createChatUser(user) {
      var client = twilio(_config2.default.twilio.accountSid, _config2.default.twilio.authToken);

      return client.chat.services(_config2.default.twilio.serviceSid).users.create({ identity: user.id }).done();
    }
  }]);

  return TwilioServices;
}();

exports.default = new TwilioServices();