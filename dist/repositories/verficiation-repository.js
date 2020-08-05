"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _cryptoRandomString = require("crypto-random-string");

var _cryptoRandomString2 = _interopRequireDefault(_cryptoRandomString);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var db = require("../models/index");

var verificationRepository = function () {
  function verificationRepository() {
    _classCallCheck(this, verificationRepository);
  }

  _createClass(verificationRepository, [{
    key: "createVerificationToken",
    value: function createVerificationToken(userData, options) {
      return db.VerificationToken.create({
        userId: userData.id,
        token: (0, _cryptoRandomString2.default)({ length: 50 })
      }, options);
    }
  }, {
    key: "findByToken",
    value: function findByToken(token) {
      return db.VerificationToken.findOne({
        where: {
          token: token
        },
        attributes: {
          exclude: db.VerificationToken.options.sensitiveFields
        }
      });
    }
  }]);

  return verificationRepository;
}();

exports.default = new verificationRepository();