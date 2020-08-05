'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _generalFactories = require('../services/factories/general-factories');

var _generalFactories2 = _interopRequireDefault(_generalFactories);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var db = require("../models/index");

var CoachesRepository = function () {
  function CoachesRepository() {
    _classCallCheck(this, CoachesRepository);
  }

  _createClass(CoachesRepository, [{
    key: 'findAndCountAllByFilter',
    value: function findAndCountAllByFilter(options) {
      var whereObject = {};
      if (options.filters) {
        if (options.filters.categoryId) {
          whereObject.categoryId = options.filters.categoryId;
        }
        if (options.filters.specialityId) {
          whereObject.specialityId = options.filters.specialityId;
        }
        if (options.filters.status) {
          whereObject.status = options.filters.status;
        }
        if (options.filters.id) {
          whereObject.id = options.filters.id;
        }
      }
      if (options.search) {
        whereObject['$or'] = [{
          '$user.name$': {
            $ilike: '%' + options.search + '%'
          }
        }, {
          '$user.about$': {
            $ilike: '%' + options.search + '%'
          }
        }, {
          '$category.label$': {
            $ilike: '%' + options.search + '%'
          }
        }];
      }

      return db.coach.findAndCountAll({
        where: whereObject,
        include: [{
          model: db.user,
          where: {
            isBanned: false,
            isDeleted: false
          },
          attributes: {
            exclude: db.user.options.sensitiveFields
          }
        }, {
          model: db.speciality
        }, {
          model: db.category
        }],
        order: options.sorting,
        offset: options.pagination.offset,
        limit: options.pagination.limit
      });
    }
  }, {
    key: 'findOneByIdAndStatus',
    value: function findOneByIdAndStatus(coachId, status) {
      var whereObject = {
        id: coachId
      };
      if (status) {
        whereObject.status = status;
      }

      return db.coach.findOne({
        where: whereObject,
        include: {
          model: db.user,
          where: {
            isBanned: false,
            isDeleted: false
          },
          attributes: []
        }
      });
    }
  }, {
    key: 'findOneById',
    value: function findOneById(coachId) {
      return db.coach.findOne({
        where: {
          id: coachId
        },
        include: [{
          model: db.user,
          where: {
            isBanned: false,
            isDeleted: false
          },
          attributes: {
            exclude: db.user.options.sensitiveFields
          }
        }, {
          model: db.speciality
        }, {
          model: db.category
        }]
      });
    }
  }, {
    key: 'findOneByUserId',
    value: function findOneByUserId(userId, options) {
      return db.coach.findOne({
        where: {
          userId: userId
        },
        transaction: options.transaction
      });
    }
  }, {
    key: 'create',
    value: function create(userId, coachData, options) {
      return db.coach.create({
        userId: userId,
        categoryId: coachData.categoryId ? coachData.categoryId : null,
        specialityId: coachData.specialityId ? coachData.specialityId : null,
        mission: coachData.mission,
        hourlyRate: coachData.hourlyRate
      }, options);
    }
  }, {
    key: 'update',
    value: function update(coach, coachObject) {
      return coach.updateAttributes({
        categoryId: _generalFactories2.default.changeIfHasProperty(coach, coachObject, "categoryId"),
        specialityId: _generalFactories2.default.changeIfHasProperty(coach, coachObject, "specialityId"),
        mission: _generalFactories2.default.changeIfHasProperty(coach, coachObject, "mission"),
        hourlyRate: _generalFactories2.default.changeIfHasProperty(coach, coachObject, "hourlyRate"),
        status: _generalFactories2.default.changeIfHasProperty(coach, coachObject, "status")
      });
    }
  }]);

  return CoachesRepository;
}();

exports.default = new CoachesRepository();