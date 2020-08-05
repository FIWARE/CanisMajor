'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _randomstring = require('randomstring');

var _randomstring2 = _interopRequireDefault(_randomstring);

var _generalFactories = require('../services/factories/general-factories');

var _generalFactories2 = _interopRequireDefault(_generalFactories);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var db = require("../models/index");

var UserRepository = function () {
  function UserRepository() {
    _classCallCheck(this, UserRepository);
  }

  _createClass(UserRepository, [{
    key: 'findOneByUsername',
    value: function findOneByUsername(username) {
      return db.user.findOne({
        where: {
          isBanned: false,
          isDeleted: false,
          username: {
            $ilike: username
          }
        },
        include: {
          model: db.coach,
          include: [{
            model: db.speciality
          }, {
            model: db.category
          }]
        }
      });
    }
  }, {
    key: 'findOneByEmail',
    value: function findOneByEmail(email) {
      return db.user.findOne({
        where: {
          isBanned: false,
          isDeleted: false,
          emailAddress: email
        },
        attributes: {
          exclude: db.user.options.sensitiveFields
        }
      });
    }
  }, {
    key: 'findOneById',
    value: function findOneById(userId, getInfoEvenIfBannedOrDeleted) {
      var whereObj = {
        id: userId,
        isBanned: false,
        isDeleted: false
      };
      if (getInfoEvenIfBannedOrDeleted) {
        delete whereObj.isBanned;
        delete whereObj.isDeleted;
      }

      return db.user.findOne({
        where: whereObj,
        attributes: {
          exclude: db.user.options.sensitiveFields
        },
        include: {
          model: db.coach,
          include: [{
            model: db.speciality
          }, {
            model: db.category
          }]
        }
      }).then(function (user) {
        if (user) {
          if (user.coach && user.coach.status != 'approved' && user.coach.status != 'pending') {
            delete user.dataValues.coach;
          }
        }

        return Promise.resolve(user);
      });
    }
  }, {
    key: 'findOneByIdWithPaymentData',
    value: function findOneByIdWithPaymentData(userId) {
      return db.user.findOne({
        where: {
          id: userId,
          isBanned: false,
          isDeleted: false
        },
        attributes: ['id', 'braintreeCustomerId', 'braintreePaymentMethodToken']
      });
    }
  }, {
    key: 'findOneByIdPublicInfo',
    value: function findOneByIdPublicInfo(userId) {
      return db.user.findOne({
        where: {
          id: userId
        },
        attributes: db.user.options.publicFields,
        include: {
          model: db.coach,
          include: [{
            model: db.speciality
          }, {
            model: db.category
          }]
        }
      }).then(function (user) {
        if (user) {
          if (user.coach && user.coach.status != 'approved') {
            delete user.dataValues.coach;
          }
        }

        return Promise.resolve(user);
      });
    }
  }, {
    key: 'findOneByCoachId',
    value: function findOneByCoachId(coachId) {
      return db.user.findOne({
        include: {
          model: db.coach,
          where: {
            id: coachId,
            status: 'approved'
          }
        },
        attributes: {
          exclude: db.user.options.sensitiveFields
        }
      });
    }
  }, {
    key: 'findOneBySocialMediaId',
    value: function findOneBySocialMediaId(socialMediaId) {
      var whereObj = {
        isBanned: false,
        isDeleted: false
      };
      whereObj = Object.assign(whereObj, socialMediaId);

      return db.user.findOne({
        where: whereObj,
        attributes: {
          exclude: db.user.options.sensitiveFields
        },
        include: {
          model: db.coach,
          include: [{
            model: db.speciality
          }, {
            model: db.category
          }]
        }
      });
    }
  }, {
    key: 'findOneWithAllAttributesById',
    value: function findOneWithAllAttributesById(userId) {
      return db.user.findOne({
        where: {
          id: userId,
          isBanned: false,
          isDeleted: false
        }
      });
    }
  }, {
    key: 'findAndCountAllByFilter',
    value: function findAndCountAllByFilter(options) {
      return db.user.findAndCountAll({
        where: options.filters,
        order: options.sorting,
        offset: options.pagination.offset,
        limit: options.pagination.limit,
        attributes: {
          exclude: db.user.options.sensitiveFields
        }
      });
    }
  }, {
    key: 'resetPassword',
    value: function resetPassword(user, password) {
      return user.updateAttributes({
        password: password
      }).then(function () {
        return Promise.resolve(password);
      });
    }
  }, {
    key: 'createUser',
    value: function createUser(userData, response, options) {
      return db.user.create({
        name: userData.name,
        username: userData.username,
        title: userData.title,
        emailAddress: userData.emailAddress,
        password: userData.password,
        about: userData.about,
        goals: userData.goals,
        profilePicture: userData.profilePicture,
        coverPicture: userData.coverPicture,
        facebookId: response ? response.facebook ? response.facebook.id : null : null,
        instagramId: response ? response.instagram ? response.instagram.id : null : null,
        linkedinId: response ? response.linkedin ? response.linkedin.id : null : null,
        firebaseToken: response ? response.firebaseToken : null
      }, options);
    }

    //update without password field.

  }, {
    key: 'update',
    value: function update(user, userObject) {
      return user.updateAttributes({
        username: _generalFactories2.default.changeIfHasProperty(user, userObject, "username"),
        name: _generalFactories2.default.changeIfHasProperty(user, userObject, "name"),
        title: _generalFactories2.default.changeIfHasProperty(user, userObject, "title"),
        emailAddress: _generalFactories2.default.changeIfHasProperty(user, userObject, "emailAddress"),
        about: _generalFactories2.default.changeIfHasProperty(user, userObject, "about"),
        goals: _generalFactories2.default.changeIfHasProperty(user, userObject, "goals"),
        profilePicture: _generalFactories2.default.changeIfHasProperty(user, userObject, "profilePicture"),
        coverPicture: _generalFactories2.default.changeIfHasProperty(user, userObject, "coverPicture"),
        isAuthor: _generalFactories2.default.changeIfHasProperty(user, userObject, "isAuthor"),
        isAdmin: _generalFactories2.default.changeIfHasProperty(user, userObject, "isAdmin"),
        isBanned: _generalFactories2.default.changeIfHasProperty(user, userObject, "isBanned"),
        isDeleted: _generalFactories2.default.changeIfHasProperty(user, userObject, "isDeleted"),
        firebaseToken: _generalFactories2.default.changeIfHasProperty(user, userObject, "firebaseToken")
      });
    }
  }, {
    key: 'verifyEmail',
    value: function verifyEmail(user, status) {
      var updateObject = {
        isVerified: status
      };
      return user.updateAttributes(updateObject);
    }
  }, {
    key: 'updateBraintreeCustomerId',
    value: function updateBraintreeCustomerId(user, customerId, paymentToken) {
      var updateObject = {
        braintreePaymentMethodToken: paymentToken
      };
      if (customerId) {
        updateObject.braintreeCustomerId = customerId;
      }

      return user.updateAttributes(updateObject);
    }
  }]);

  return UserRepository;
}();

exports.default = new UserRepository();