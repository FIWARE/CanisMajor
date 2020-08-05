"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _generalFactories = require("../services/factories/general-factories");

var _generalFactories2 = _interopRequireDefault(_generalFactories);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var db = require("../models/index");

var CoachWorkHoursRepository = function () {
  function CoachWorkHoursRepository() {
    _classCallCheck(this, CoachWorkHoursRepository);
  }

  _createClass(CoachWorkHoursRepository, [{
    key: "findOneByCoachId",
    value: function findOneByCoachId(coachId) {
      return db.coachWorkHours.findOne({
        where: {
          coachId: coachId
        }
      });
    }
  }, {
    key: "update",
    value: function update(coachWorkHours, coachWorkHoursObject) {
      return coachWorkHours.updateAttributes({
        morningSessionStart: _generalFactories2.default.changeIfHasProperty(coachWorkHours, coachWorkHoursObject, "morningSessionStart"),
        morningSessionEnd: _generalFactories2.default.changeIfHasProperty(coachWorkHours, coachWorkHoursObject, "morningSessionEnd"),
        afternoonSessionStart: _generalFactories2.default.changeIfHasProperty(coachWorkHours, coachWorkHoursObject, "afternoonSessionStart"),
        afternoonSessionEnd: _generalFactories2.default.changeIfHasProperty(coachWorkHours, coachWorkHoursObject, "afternoonSessionEnd"),
        acceptOutsideWorkingHours: _generalFactories2.default.changeIfHasProperty(coachWorkHours, coachWorkHoursObject, "acceptOutsideWorkingHours"),
        timeZone: _generalFactories2.default.changeIfHasProperty(coachWorkHours, coachWorkHoursObject, "timeZone")
      });
    }
  }, {
    key: "createDefault",
    value: function createDefault(coachId, timeZone, options) {
      return db.coachWorkHours.create({
        coachId: coachId,
        timeZone: timeZone
      }, options);
    }
  }]);

  return CoachWorkHoursRepository;
}();

exports.default = new CoachWorkHoursRepository();