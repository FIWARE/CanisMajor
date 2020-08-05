"use strict";

var _passport = require("passport");

var _passport2 = _interopRequireDefault(_passport);

var _passportJwt = require("passport-jwt");

var _passportJwt2 = _interopRequireDefault(_passportJwt);

var _config = require("./config/config.json");

var _config2 = _interopRequireDefault(_config);

var _usersRepository = require("./repositories/users-repository");

var _usersRepository2 = _interopRequireDefault(_usersRepository);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// auth.js
var ExtractJwt = _passportJwt2.default.ExtractJwt;
var Strategy = _passportJwt2.default.Strategy;

var params = {
  secretOrKey: _config2.default.jwt.jwtSecret,
  jwtFromRequest: ExtractJwt.fromAuthHeader()
};

module.exports = function () {
  var strategy = new Strategy(params, function (payload, done) {
    var err = new Error("user_not_found");
    err.status = 401;

    return _usersRepository2.default.findOneById(payload.id).then(function (user) {
      if (user) {
        done(null, {
          id: user.id
        });
      } else {
        done(err, null);
      }

      return Promise.resolve(null);
    }).catch(function () {
      return done(err, null);
    });
  });

  _passport2.default.use(strategy);

  return {
    initialize: function initialize() {
      return _passport2.default.initialize();
    },

    authenticate: function authenticate() {
      return _passport2.default.authenticate("jwt", _config2.default.jwt.jwtConfig);
    }
  };
};