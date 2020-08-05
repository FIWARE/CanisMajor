'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _appointmentsRepository = require('../../repositories/appointments-repository');

var _appointmentsRepository2 = _interopRequireDefault(_appointmentsRepository);

var _usersRepository = require('../../repositories/users-repository');

var _usersRepository2 = _interopRequireDefault(_usersRepository);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _notification = require('../firebase-services/notification');

var _notification2 = _interopRequireDefault(_notification);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var cron = require("node-cron");

var interval = 10;

var preAppointmentNotification = function () {
    function preAppointmentNotification() {
        _classCallCheck(this, preAppointmentNotification);
    }

    _createClass(preAppointmentNotification, [{
        key: 'init',
        value: function init() {
            cron.schedule("*/10 * * * *", function async() {
                var _this = this;

                var startTime = (0, _moment2.default)().toISOString();
                var endTime = (0, _moment2.default)().add(10, 'minutes').toISOString();
                _appointmentsRepository2.default.findAllByDate(startTime, endTime).then(function () {
                    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(res) {
                        return regeneratorRuntime.wrap(function _callee2$(_context2) {
                            while (1) {
                                switch (_context2.prev = _context2.next) {
                                    case 0:
                                        res.forEach(function () {
                                            var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(result) {
                                                var coachId, userId, coach, user;
                                                return regeneratorRuntime.wrap(function _callee$(_context) {
                                                    while (1) {
                                                        switch (_context.prev = _context.next) {
                                                            case 0:
                                                                if (!result) {
                                                                    _context.next = 11;
                                                                    break;
                                                                }

                                                                coachId = result.coachId;
                                                                userId = result.userId;
                                                                _context.next = 5;
                                                                return _usersRepository2.default.findOneByCoachId(coachId);

                                                            case 5:
                                                                coach = _context.sent;
                                                                _context.next = 8;
                                                                return _usersRepository2.default.findOneById(userId);

                                                            case 8:
                                                                user = _context.sent;

                                                                if (coach.firebaseToken != null) {
                                                                    _notification2.default.sendMessage('Upcoming Appointment Update', 'You have an appointment with ' + user.name + 'in ' + interval + 'minutes.', coach.firebaseToken);
                                                                }
                                                                if (user.firebaseToken != null) {
                                                                    _notification2.default.sendMessage('Upcoming Appointment Update', 'You have an appointment with ' + coach.name + 'in ' + interval + 'minutes.', user.firebaseToken);
                                                                }

                                                            case 11:
                                                            case 'end':
                                                                return _context.stop();
                                                        }
                                                    }
                                                }, _callee, _this);
                                            }));

                                            return function (_x2) {
                                                return _ref2.apply(this, arguments);
                                            };
                                        }());

                                    case 1:
                                    case 'end':
                                        return _context2.stop();
                                }
                            }
                        }, _callee2, _this);
                    }));

                    return function (_x) {
                        return _ref.apply(this, arguments);
                    };
                }()).catch(function (err) {
                    console.log('err' + JSON.stringify(err));
                });
            });
        }
    }]);

    return preAppointmentNotification;
}();

exports.default = new preAppointmentNotification();