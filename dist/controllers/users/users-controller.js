'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _coachesRepository = require('../../repositories/coaches-repository');

var _coachesRepository2 = _interopRequireDefault(_coachesRepository);

var _coachWorkHoursRepository = require('../../repositories/coach-work-hours-repository');

var _coachWorkHoursRepository2 = _interopRequireDefault(_coachWorkHoursRepository);

var _baseCrudController = require('../base-crud-controller');

var _baseCrudController2 = _interopRequireDefault(_baseCrudController);

var _generalErrors = require('../../services/error-services/general-errors');

var _generalErrors2 = _interopRequireDefault(_generalErrors);

var _generalFactories = require('../../services/factories/general-factories');

var _generalFactories2 = _interopRequireDefault(_generalFactories);

var _notificationsRepository = require('../../repositories/notifications-repository');

var _notificationsRepository2 = _interopRequireDefault(_notificationsRepository);

var _usersRepository = require('../../repositories/users-repository');

var _usersRepository2 = _interopRequireDefault(_usersRepository);

var _sequelize = require('../../sequelize');

var _sequelize2 = _interopRequireDefault(_sequelize);

var _objectFactory = require('../../services/filtering-services/object-factory');

var _objectFactory2 = _interopRequireDefault(_objectFactory);

var _paginationOptions = require('../../services/filtering-services/pagination-options');

var _paginationOptions2 = _interopRequireDefault(_paginationOptions);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var UsersControllers = function (_BaseCRUDController) {
  _inherits(UsersControllers, _BaseCRUDController);

  function UsersControllers() {
    _classCallCheck(this, UsersControllers);

    var _this = _possibleConstructorReturn(this, (UsersControllers.__proto__ || Object.getPrototypeOf(UsersControllers)).call(this));

    _this.repository = _usersRepository2.default;
    _this.filters = ['id'];
    return _this;
  }

  _createClass(UsersControllers, [{
    key: 'updateUser',
    value: function updateUser(req, res, next) {
      var body = JSON.parse(JSON.stringify(req.body));
      var userId = req.params.id || req.user.id;
      if (req.params.id && req.user.id != req.params.id && !req.user.isAdmin) {
        _generalErrors2.default.forbidden();
      }

      return _usersRepository2.default.findOneById(userId, req.user.isAdmin).then(function (user) {
        if (!user) {
          _generalErrors2.default.notFound();
        }
        //delete isAdmin and isDeleted field from req if someone without permission try to change it.
        if ((body.isAdmin || body.isDeleted) && user.id == req.params.id && !req.user.isAdmin || !req.params.id) {
          var propertyArray = [];
          if (body.isAdmin) {
            propertyArray.push('isAdmin');
          }
          if (body.isDeleted) {
            propertyArray.push('isDeleted');
          }
          _generalFactories2.default.deletePropertiesFromObject(body, propertyArray);
        }
        return _usersRepository2.default.update(user, body);
      }).then(function (updatedUser) {
        _generalFactories2.default.deletePropertiesFromSequelizeResponseObject(updatedUser, updatedUser._modelOptions.sensitiveFields);
        res.jsonp(updatedUser);

        return null;
      }).catch(function (err) {
        _generalErrors2.default.addErrStatus(err, 422);

        return next(err);
      });
    }
  }, {
    key: 'oneSpecifiedUser',
    value: function oneSpecifiedUser(req, res, next) {
      var repository = _usersRepository2.default.findOneByIdPublicInfo(req.params.id);
      if (req.user.id == req.params.id || req.user.isAdmin) {
        repository = _usersRepository2.default.findOneById(req.params.id, req.user.isAdmin);
      }

      return repository.then(function (user) {
        if (user) {
          res.jsonp(user);

          return null;
        }

        _generalErrors2.default.notFound();
      }).catch(function (err) {
        _generalErrors2.default.addErrStatus(err, 422);

        return next(err);
      });
    }
  }, {
    key: 'allNotifications',
    value: function allNotifications(req, res, next) {
      var options = _objectFactory2.default.queryOptions(req.query, ['objectType', 'notificationType', 'seen']);

      return _notificationsRepository2.default.findAndCountAllByUserId(req.params.id, options).then(function (notifications) {
        res.jsonp(_paginationOptions2.default.findAllResponseObject(notifications, req.query));
      }).catch(function (err) {
        _generalErrors2.default.addErrStatus(err, 422);

        return next(err);
      });
    }
  }, {
    key: 'createCoach',
    value: function createCoach(req, res, next) {
      var coachDetails = {};
      var userDetails = {};
      console.log(req.body);

      return _usersRepository2.default.findOneById(req.params.id).then(function (user) {
        if (!user) {
          return _generalErrors2.default.notFound();
        }
        userDetails = user;

        return _sequelize2.default.transaction(function (t) {
          return _coachesRepository2.default.findOneByUserId(req.params.id, { transaction: t }).then(function (coach) {
            if (coach) {
              return _generalErrors2.default.unprocessableEntity('user_is_coach');
            }

            return _coachesRepository2.default.create(req.params.id, req.body, { transaction: t });
          }).then(function (createdCoach) {
            coachDetails = createdCoach;

            return _coachWorkHoursRepository2.default.createDefault(createdCoach.id, req.body.timeZone, { transaction: t });
          }).then(function (coachSettings) {
            if (coachSettings) {
              coachDetails.dataValues.coachWorkHours = coachSettings;
              userDetails.dataValues.coach = coachDetails;
              res.jsonp(userDetails);

              return null;
            }

            return _generalErrors2.default.badRequest(null);
          });
        });
      }).catch(function (err) {
        _generalErrors2.default.addErrStatus(err, 422);

        return next(err);
      });
    }
  }]);

  return UsersControllers;
}(_baseCrudController2.default);

exports.default = new UsersControllers();