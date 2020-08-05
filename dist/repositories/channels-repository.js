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

var ChannelsRepository = function () {
  function ChannelsRepository() {
    _classCallCheck(this, ChannelsRepository);
  }

  _createClass(ChannelsRepository, [{
    key: "findOrCreateChannel",
    value: function findOrCreateChannel(channel, userId, options) {
      return db.channel.findOrCreate({
        where: {
          userId: userId,
          name: channel.name
        },
        transaction: options.transaction
      }).spread(function (channelObj) {
        return channelObj.updateAttributes({
          lastVisit: channel.lastVisit
        }, options);
      });
    }
  }, {
    key: "findAndCountAllByUserId",
    value: function findAndCountAllByUserId(userId, options) {
      return db.channel.findAndCountAll({
        where: options.filters,
        include: {
          model: db.user,
          where: {
            id: userId
          },
          attributes: []
        },
        order: options.sorting,
        offset: options.pagination.offset,
        limit: options.pagination.limit
      });
    }
  }]);

  return ChannelsRepository;
}();

exports.default = new ChannelsRepository();