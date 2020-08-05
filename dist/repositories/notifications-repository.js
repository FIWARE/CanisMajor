'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _baseCrudRepository = require('./base-crud-repository');

var _baseCrudRepository2 = _interopRequireDefault(_baseCrudRepository);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var db = require("../models/index");

var NotificationsRepository = function (_BaseCRUDRepository) {
  _inherits(NotificationsRepository, _BaseCRUDRepository);

  function NotificationsRepository() {
    _classCallCheck(this, NotificationsRepository);

    var _this = _possibleConstructorReturn(this, (NotificationsRepository.__proto__ || Object.getPrototypeOf(NotificationsRepository)).call(this));

    _this.model = db.notification;
    _this.createFields = ['userId', 'objectId', 'objectType', 'notificationType'];
    _this.updateFields = [];
    return _this;
  }

  _createClass(NotificationsRepository, [{
    key: 'findAndCountAllByUserId',
    value: function findAndCountAllByUserId(userId, options) {
      var whereObject = options.filters;
      whereObject.userId = userId;

      return db.notification.findAndCountAll({
        where: whereObject,
        order: [['createdAt', 'DESC']],
        offset: options.pagination.offset,
        limit: options.pagination.limit
      });
    }
  }, {
    key: 'findOneByIdAndUserId',
    value: function findOneByIdAndUserId(id, userId) {
      return this.model.findOne({
        where: {
          id: id,
          userId: userId
        }
      });
    }
  }, {
    key: 'markAsSeen',
    value: function markAsSeen(notification) {
      return notification.updateAttributes({
        seen: true
      });
    }
  }]);

  return NotificationsRepository;
}(_baseCrudRepository2.default);

exports.default = new NotificationsRepository();