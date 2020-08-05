'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = cryptString;

var _bcrypt = require('bcrypt');

var _bcrypt2 = _interopRequireDefault(_bcrypt);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Generate a salt
var salt = _bcrypt2.default.genSaltSync(10);

function cryptString(somethingToCrypt) {
  // Hash the password with the salt
  return _bcrypt2.default.hashSync(somethingToCrypt, salt);
};