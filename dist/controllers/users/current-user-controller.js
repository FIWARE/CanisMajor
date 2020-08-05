'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _bcrypt = require('bcrypt');

var _bcrypt2 = _interopRequireDefault(_bcrypt);

var _channelsRepository = require('../../repositories/channels-repository');

var _channelsRepository2 = _interopRequireDefault(_channelsRepository);

var _generalErrors = require('../../services/error-services/general-errors');

var _generalErrors2 = _interopRequireDefault(_generalErrors);

var _generalFactories = require('../../services/factories/general-factories');

var _generalFactories2 = _interopRequireDefault(_generalFactories);

var _objectFactory = require('../../services/filtering-services/object-factory');

var _objectFactory2 = _interopRequireDefault(_objectFactory);

var _paginationOptions = require('../../services/filtering-services/pagination-options');

var _paginationOptions2 = _interopRequireDefault(_paginationOptions);

var _sequelize = require('../../sequelize');

var _sequelize2 = _interopRequireDefault(_sequelize);

var _twilioServices = require('../../services/controller-services/twilio-services');

var _twilioServices2 = _interopRequireDefault(_twilioServices);

var _usersRepository = require('../../repositories/users-repository');

var _usersRepository2 = _interopRequireDefault(_usersRepository);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var CurrentUserControllers = function () {
  function CurrentUserControllers() {
    _classCallCheck(this, CurrentUserControllers);
  }

  _createClass(CurrentUserControllers, [{
    key: 'currentUser',
    value: function currentUser(req, res, next) {
      return _usersRepository2.default.findOneById(req.user.id).then(function (user) {
        res.jsonp(user);
      }).catch(function (err) {
        _generalErrors2.default.addErrStatus(err, 422);

        return next(err);
      });
    }
  }, {
    key: 'generateTwilioTokens',
    value: function generateTwilioTokens(req, res, next) {
      if (req.user) {
        var twilioChatToken = _twilioServices2.default.createTwilioChatToken(req.user);
        var twilioVideoToken = _twilioServices2.default.createTwilioVideoToken(req.user, req.body.videoRoom);

        res.jsonp({
          twilioChatToken: twilioChatToken,
          twilioVideoToken: twilioVideoToken
        });

        return null;
      }
      var err = new Error('bad_request');
      err.status = 400;

      return next(err);
    }
  }, {
    key: 'changeCurrentUserPassword',
    value: function changeCurrentUserPassword(req, res, next) {
      return _usersRepository2.default.findOneWithAllAttributesById(req.user.id).then(function (user) {
        if (!user) {
          return _generalErrors2.default.badRequest();
        }

        var _req$body = req.body,
            oldPassword = _req$body.oldPassword,
            newPassword = _req$body.newPassword;


        if (!oldPassword && !newPassword) {
          return _generalErrors2.default.unprocessableEntity('no_records');
        } else if (!oldPassword || !newPassword) {
          return _generalErrors2.default.unprocessableEntity('missing_record');
        }

        var oldPasswordMatched = _bcrypt2.default.compareSync(oldPassword, user.password);

        if (oldPasswordMatched) {
          return user.updateAttributes({ password: newPassword });
        }

        return _generalErrors2.default.authenticationFailed('wrong_old_password');
      }).then(function (updateRes) {
        res.jsonp({
          success: true,
          message: 'password_changed'
        });

        return null;
      }).catch(function (err) {
        _generalErrors2.default.addErrStatus(err, 422);

        return next(err);
      });
    }
  }, {
    key: 'setUserToDeleted',
    value: function setUserToDeleted(req, res, next) {
      return _usersRepository2.default.findOneById(req.user.id).then(function (user) {
        if (!user) {
          return _generalErrors2.default.badRequest();
        }

        return user.updateAttributes({ isDeleted: true });
      }).then(function () {
        res.jsonp({
          success: true,
          message: 'user_deleted'
        });

        return null;
      }).catch(function (err) {
        _generalErrors2.default.addErrStatus(err, 422);

        return next(err);
      });
    }
  }, {
    key: 'updateUserChannel',
    value: function updateUserChannel(req, res, next) {
      var channelDetails = null;
      _generalFactories2.default.verifyObjectHasFields(req.body, ['name', 'lastVisit']);

      return _sequelize2.default.transaction().then(function (t) {
        return _channelsRepository2.default.findOrCreateChannel(req.body, req.user.id, { transaction: t }).then(function (channel) {
          channelDetails = channel;

          return t.commit();
        }).then(function () {
          res.jsonp(channelDetails);
        }).catch(function (err) {
          t.rollback();
          _generalErrors2.default.addErrStatus(err, 422);

          return next(err);
        });
      });
    }
  }, {
    key: 'allChannels',
    value: function allChannels(req, res, next) {
      var options = _objectFactory2.default.queryOptions(req.query, ['id', 'name']);

      return _channelsRepository2.default.findAndCountAllByUserId(req.user.id, options).then(function (channels) {
        res.jsonp(_paginationOptions2.default.findAllResponseObject(channels, req.query));
      }).catch(function (err) {
        _generalErrors2.default.addErrStatus(err, 400);

        return next(err);
      });
    }
  }]);

  return CurrentUserControllers;
}();

exports.default = new CurrentUserControllers();