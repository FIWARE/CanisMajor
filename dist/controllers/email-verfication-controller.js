'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _usersRepository = require('../repositories/users-repository');

var _usersRepository2 = _interopRequireDefault(_usersRepository);

var _verficiationRepository = require('../repositories/verficiation-repository');

var _verficiationRepository2 = _interopRequireDefault(_verficiationRepository);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var VerificationController = function () {
    function VerificationController() {
        _classCallCheck(this, VerificationController);
    }

    _createClass(VerificationController, [{
        key: 'verify',
        value: function verify(req, res, next) {
            return _usersRepository2.default.findOneByEmail(req.query.email).then(function (user) {
                if (user.isVerified) {
                    return res.status(202).json('Email Already Verified');
                } else {
                    _verficiationRepository2.default.findByToken(req.query.token).then(function (foundToken) {
                        if (foundToken) {
                            _usersRepository2.default.verifyEmail(user, true).then(function (updatedUser) {
                                return res.status(403).json('User with email address: ' + updatedUser.emailAddress + ' has been verified');
                            }).catch(function (reason) {
                                return res.status(403).json('Verification failed');
                            });
                        } else {
                            return res.status(404).json('Token expired');
                        }
                    }).catch(function (reason) {
                        return res.status(404).json('Token expired');
                    });
                }
            }).catch(function (reason) {
                return res.status(404).json('Email not found');
            });
        }
    }]);

    return VerificationController;
}();

exports.default = new VerificationController();