'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _requestPromise = require('request-promise');

var _requestPromise2 = _interopRequireDefault(_requestPromise);

var _generalErrors = require('../../services/error-services/general-errors');

var _generalErrors2 = _interopRequireDefault(_generalErrors);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var SocialMediaServices = function () {
  function SocialMediaServices() {
    _classCallCheck(this, SocialMediaServices);
  }

  _createClass(SocialMediaServices, [{
    key: 'requestDetailsFromFacebook',

    /**
     * requestDetailsFromFacebook make a request for validate authenticate token
     * @param  {Object} authParams facebook authenticate object
     * @param  {Object} authParams.token facebook authenticate token
     * @return {Object} facebook response object
     */
    value: function requestDetailsFromFacebook(authParams) {
      if (!authParams && !authParams.token) {
        return Promise.resolve(null);
      }
      var userFieldSet = 'id, email';
      var options = {
        method: 'GET',
        uri: 'https://graph.facebook.com/v2.10/me',
        qs: {
          access_token: authParams.token,
          fields: userFieldSet
        }
      };

      return (0, _requestPromise2.default)(options).then(function (facebookResponse) {
        var facebook = { facebook: JSON.parse(facebookResponse) };

        return Promise.resolve(facebook);
      }).catch(function (err) {
        err.status = 500;
        err.message = 'facebook_error';

        throw err;
      });
    }

    /**
     * requestDetailsFromInstagram make a request for validate authenticate token
     * @param  {Object} authParams instagram authenticate object
     * @param  {Object} authParams.token instagram authenticate token
     * @return {Object} instagram response object
     */

  }, {
    key: 'requestDetailsFromInstagram',
    value: function requestDetailsFromInstagram(authParams) {
      if (!authParams && !authParams.token) {
        return Promise.resolve(null);
      }
      var options = {
        method: 'GET',
        uri: 'https://api.instagram.com/v1/users/self/',
        qs: {
          access_token: authParams.token
        }
      };

      return (0, _requestPromise2.default)(options).then(function (instagramResponse) {
        var instagram = { instagram: JSON.parse(instagramResponse).data };

        return Promise.resolve(instagram);
      }).catch(function (err) {
        err.status = 500;
        err.message = 'instagram_error';

        throw err;
      });
    }

    /**
     * requestDetailsFromLinkedin make a request for validate authenticate token
     * @param  {Object} authParams linkedin authenticate object
     * @param  {Object} authParams.token linkedin authenticate token
     * @return {Object} linkedin response object
     */

  }, {
    key: 'requestDetailsFromLinkedin',
    value: function requestDetailsFromLinkedin(authParams) {
      if (!authParams && !authParams.token) {
        return Promise.resolve(null);
      }
      var options = {
        method: 'GET',
        uri: 'https://api.linkedin.com/v2/me',
        qs: {
          oauth2_access_token: authParams.token
        }
      };

      return (0, _requestPromise2.default)(options).then(function (linkedinResponse) {
        var linkedin = { linkedin: JSON.parse(linkedinResponse) };

        return Promise.resolve(linkedin);
      }).catch(function (err) {
        err.status = 500;
        err.message = 'linkedin_error';

        throw err;
      });
    }
  }, {
    key: 'chooseRegisterType',
    value: function chooseRegisterType(user) {
      if (user.facebookAccessToken) {
        user.token = user.facebookAccessToken;

        return this.requestDetailsFromFacebook(user);
      }

      if (user.instagramAccessToken) {
        user.token = user.instagramAccessToken;

        return this.requestDetailsFromInstagram(user);
      }

      if (user.linkedinAccessToken) {
        user.token = user.linkedinAccessToken;

        return this.requestDetailsFromLinkedin(user);
      }

      return Promise.resolve(null);
    }
  }]);

  return SocialMediaServices;
}();

exports.default = new SocialMediaServices();