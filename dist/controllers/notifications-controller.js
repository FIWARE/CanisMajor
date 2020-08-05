'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _generalErrors = require('../services/error-services/general-errors');

var _generalErrors2 = _interopRequireDefault(_generalErrors);

var _notificationsRepository = require('../repositories/notifications-repository');

var _notificationsRepository2 = _interopRequireDefault(_notificationsRepository);

var _notification = require('../services/firebase-services/notification');

var _notification2 = _interopRequireDefault(_notification);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var NotificationsController = function () {
  function NotificationsController() {
    _classCallCheck(this, NotificationsController);
  }

  _createClass(NotificationsController, [{
    key: 'markAsSeen',
    value: function markAsSeen(req, res, next) {
      return _notificationsRepository2.default.findOneByIdAndUserId(req.params.id, req.user.id).then(function (notification) {
        if (notification) {
          return _notificationsRepository2.default.markAsSeen(notification);
        }

        _generalErrors2.default.notFound();
      }).then(function (updatedNotification) {
        res.jsonp(updatedNotification);

        return null;
      }).catch(function (err) {
        _generalErrors2.default.addErrStatus(err, 422);

        return next(err);
      });
    }
  }, {
    key: 'createFireBaseNotification',
    value: function createFireBaseNotification(req, res, next) {
      if (req.body.token == null || req.body.token == undefined) {
        res.json({ Error: 'token is missing' }).status(422);
      } else if (req.body.title == null || req.body.title == undefined) {
        res.json({ Error: 'title is missing' }).status(422);
      } else if (req.body.message == null || req.body.message == undefined) {
        res.json({ Error: 'message is missing' }).status(422);
      } else {
        _notification2.default.sendMessage(req.body.title, req.body.message, req.body.token);
        res.json({ Status: 'message is sent' }).status(200);
        return null;
      }
    }
  }]);

  return NotificationsController;
}();

exports.default = new NotificationsController();