"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _jwtSimple = require("jwt-simple");

var _jwtSimple2 = _interopRequireDefault(_jwtSimple);

var _config = require("../../config/config.json");

var _config2 = _interopRequireDefault(_config);

var _usersRepository = require("../../repositories/users-repository");

var _usersRepository2 = _interopRequireDefault(_usersRepository);

var _generalErrors = require("../error-services/general-errors");

var _generalErrors2 = _interopRequireDefault(_generalErrors);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var AuthenticationMiddlewares = function () {
  function AuthenticationMiddlewares() {
    _classCallCheck(this, AuthenticationMiddlewares);
  }

  _createClass(AuthenticationMiddlewares, [{
    key: "moveTokenFromQueryParamsToHeader",
    value: function moveTokenFromQueryParamsToHeader(req, res, next) {
      if (!req.query.token) {
        var err = new Error();
        err.status = 403;

        return next(err);
      }
      req.headers["authorization"] = 'JWT ' + req.query.token;

      return next();
    }
  }, {
    key: "isAdmin",
    value: function isAdmin(req, res, next) {
      if (req.user && req.user.isAdmin === true) {
        return next();
      }
      var err = new Error();
      err.status = 403;

      return next(err);
    }
  }, {
    key: "isAdminOrSelf",


    //this is used on users routes.
    value: function isAdminOrSelf(req, res, next) {
      if (req.user.isAdmin === true || req.user.id == req.params.id) {
        return next();
      }
      var err = new Error();
      err.status = 403;

      return next(err);
    }
  }, {
    key: "isAdminOrSelfCoach",


    //this is used on coach routes.
    value: function isAdminOrSelfCoach(req, res, next) {
      if (req.user.isAdmin === true) {
        return next();
      }

      return _usersRepository2.default.findOneByCoachId(req.params.id).then(function (user) {
        if (user && user.id == req.user.id) {
          next();

          return null;
        }
        var err = new Error();
        err.status = 403;
        next(err);

        return null;
      });
    }
  }, {
    key: "attachAuthUserToRequest",
    value: function attachAuthUserToRequest(req, res, next) {
      try {
        var token = req.headers.authorization.split(' ')[1];
        if (!token) {
          throw new Error('missing_token');
        }

        var decoded = _jwtSimple2.default.decode(token, _config2.default.jwt.jwtSecret);

        if (decoded.expireDate <= Date.now()) {
          _generalErrors2.default.authenticationFailed('token_expired');
        }
      } catch (err) {
        return next(err);
      }

      return _usersRepository2.default.findOneById(decoded.id).then(function (user) {
        req.user = user;
        next();

        return Promise.resolve(null);
      }).catch(function (err) {
        return next(err);
      });
    }
  }]);

  return AuthenticationMiddlewares;
}();

exports.default = new AuthenticationMiddlewares();