'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _jwtSimple = require('jwt-simple');

var _jwtSimple2 = _interopRequireDefault(_jwtSimple);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _pug = require('pug');

var _pug2 = _interopRequireDefault(_pug);

var _authenticateServices = require('../../services/controller-services/authenticate-services');

var _authenticateServices2 = _interopRequireDefault(_authenticateServices);

var _config = require('../../config/config.json');

var _config2 = _interopRequireDefault(_config);

var _emailServices = require('../../services/email-services/email-services');

var _emailServices2 = _interopRequireDefault(_emailServices);

var _generalErrors = require('../../services/error-services/general-errors');

var _generalErrors2 = _interopRequireDefault(_generalErrors);

var _generalFactories = require('../../services/factories/general-factories');

var _generalFactories2 = _interopRequireDefault(_generalFactories);

var _socialMediaServices = require('../../services/social-media-services/social-media-services');

var _socialMediaServices2 = _interopRequireDefault(_socialMediaServices);

var _usersRepository = require('../../repositories/users-repository');

var _usersRepository2 = _interopRequireDefault(_usersRepository);

var _verficiationRepository = require('../../repositories/verficiation-repository');

var _verficiationRepository2 = _interopRequireDefault(_verficiationRepository);

var _twilioServices = require('../../services/controller-services/twilio-services');

var _twilioServices2 = _interopRequireDefault(_twilioServices);

var _bcrypt = require('bcrypt');

var _bcrypt2 = _interopRequireDefault(_bcrypt);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var AuthenticateUserControllers = function () {
  function AuthenticateUserControllers() {
    _classCallCheck(this, AuthenticateUserControllers);
  }

  _createClass(AuthenticateUserControllers, [{
    key: 'registerUser',
    value: function registerUser(req, res, next) {
      var userDetails = {};
      var result = {};
      var token = '';
      return _socialMediaServices2.default.chooseRegisterType(req.body).then(function (response) {
        return _usersRepository2.default.createUser(req.body, response, null);
      }).then(function (user) {
        userDetails = user;
        _generalFactories2.default.deletePropertiesFromSequelizeResponseObject(user, user._modelOptions.sensitiveFields);

        return _authenticateServices2.default.createAuthResponse(user);
      }).then(function (response) {
        result = response;
        return Promise.resolve(null);
      }).then(function () {
        // const temp = { "profilePicture": null, "coverPicture": null, "isAdmin": false, "isBanned": false, "isDeleted": false, "isVerified": false, "id": 12, "name": "Brian Tracey", "username": "briannn111", "title": null, "emailAddress": "singhhp1069@gmail.com", "about": null, "goals": null, "firebaseToken": null, "updatedAt": "2020-06-21T15:21:03.874Z", "createdAt": "2020-06-21T15:21:03.874Z" };
        return _verficiationRepository2.default.createVerificationToken(userDetails);
      }).then(function (result) {
        token = result.token;
        return _emailServices2.default.sendRegisterMail(userDetails);
      }).then(function () {
        var homeUrl = req.protocol + '://' + req.get('host');
        return _emailServices2.default.emailVerficiation(homeUrl, userDetails.emailAddress, token);
      }).then(function () {
        res.jsonp(result);
        _twilioServices2.default.createChatUser(userDetails);
      }).catch(function (err) {
        _generalErrors2.default.addErrStatus(err, 422);

        return next(err);
      });
    }
  }, {
    key: 'facebookAuthenticate',
    value: function facebookAuthenticate(req, res, next) {
      return _authenticateServices2.default.getAccesToken(req.body, _socialMediaServices2.default.requestDetailsFromFacebook).then(function (response) {
        res.jsonp(response);

        return;
      }).catch(function (err) {
        _generalErrors2.default.addErrStatus(err, 401);

        return next(err);
      });
    }
  }, {
    key: 'instagramAuthenticate',
    value: function instagramAuthenticate(req, res, next) {
      return _authenticateServices2.default.getAccesToken(req.body, _socialMediaServices2.default.requestDetailsFromInstagram).then(function (response) {
        res.jsonp(response);

        return;
      }).catch(function (err) {
        _generalErrors2.default.addErrStatus(err, 401);

        return next(err);
      });
    }
  }, {
    key: 'linkedinAuthenticate',
    value: function linkedinAuthenticate(req, res, next) {
      return _authenticateServices2.default.getAccesToken(req.body, _socialMediaServices2.default.requestDetailsFromLinkedin).then(function (response) {
        res.jsonp(response);

        return;
      }).catch(function (err) {
        _generalErrors2.default.addErrStatus(err, 401);

        return next(err);
      });
    }
  }, {
    key: 'authenticateUser',
    value: function authenticateUser(req, res, next) {
      if (!req.body.username || !req.body.password) {
        return _generalErrors2.default.authenticationFailed('authentication_failed');
      }
      var username = req.body.username;
      var password = req.body.password;

      return _usersRepository2.default.findOneByUsername(username).then(function (user) {
        if (user && _bcrypt2.default.compareSync(password, user.password)) {
          return _authenticateServices2.default.createAuthResponse(user);
        }

        return _generalErrors2.default.authenticationFailed('authentication_failed');
      }).then(function (response) {
        res.jsonp(response);

        return;
      }).catch(function (err) {
        _generalErrors2.default.addErrStatus(err, 401);

        next(err);
      });
    }
  }, {
    key: 'sendPasswordResetEmail',
    value: function sendPasswordResetEmail(req, res, next) {
      var baseUrl = req.headers.host;
      var email;
      var user;
      var resetPasswordToken;

      if (req.body.emailAddress) {
        email = req.body.emailAddress.toLowerCase();
      }

      return _usersRepository2.default.findOneByEmail(email).then(function (userDetails) {
        if (!userDetails) {
          return Promise.resolve(null);
        }

        user = userDetails;
        var payload = {
          id: user.id,
          expireDate: (0, _moment2.default)().add(_config2.default.jwt.passwordResetTokenAvailability, 'days').valueOf()
        };
        resetPasswordToken = _jwtSimple2.default.encode(payload, _config2.default.jwt.jwtSecret);

        return _emailServices2.default.sendResetPasswordEmail(user, resetPasswordToken, baseUrl);
      }).then(function () {
        res.jsonp({
          success: true,
          message: "password_reseted_successfully"
        });

        return Promise.resolve(null);
      }).catch(function (err) {
        _generalErrors2.default.addErrStatus(err, 422);

        return next(err);
      });
    }
  }, {
    key: 'resetPasswordForm',
    value: function resetPasswordForm(req, res, next) {
      var user = null;
      var email = null;
      var token = req.params.token;
      var decoded = _jwtSimple2.default.decode(token, _config2.default.jwt.jwtSecret);

      if (decoded.expireDate <= Date.now()) {
        _generalErrors2.default.authenticationFailed('token_expired');
      }

      return _usersRepository2.default.findOneById(decoded.id).then(function (userDetails) {
        if (!userDetails) {
          _generalErrors2.default.notFound();
        }
        user = userDetails;

        res.render('./reset-password.pug', {
          token: token,
          message: null
        });
      }).catch(function (err) {
        res.render('./reset-password.pug', {
          token: token,
          message: 'token_error'
        });

        return next(err);
      });
    }
  }, {
    key: 'resetPassword',
    value: function resetPassword(req, res, next) {
      var password = req.body.password1;
      var token = req.params.token;

      if (password.length < 6) {
        return res.render('./reset-password.pug', {
          token: token,
          message: 'short_password'
        });
      }

      if (password !== req.body.password2) {
        return res.render('./reset-password.pug', {
          token: token,
          message: 'password_need_match'
        });
      };

      var token = req.params.token;
      var decoded = _jwtSimple2.default.decode(token, _config2.default.jwt.jwtSecret);

      return _usersRepository2.default.findOneById(decoded.id).then(function (userDetails) {
        if (!userDetails) {
          _generalErrors2.default.notFound();
        }

        return _usersRepository2.default.resetPassword(userDetails, password);
      }).then(function () {
        return res.render('./reset-password.pug', {
          token: token,
          message: 'password_changed'
        });
      }).catch(function (err) {
        res.render('./reset-password.pug', {
          token: token,
          message: 'something_went_wrong'
        });

        return next(err);
      });
    }
  }]);

  return AuthenticateUserControllers;
}();

exports.default = new AuthenticateUserControllers();