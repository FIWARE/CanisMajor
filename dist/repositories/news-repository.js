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

var NewsRepository = function (_BaseCRUDRepository) {
  _inherits(NewsRepository, _BaseCRUDRepository);

  function NewsRepository() {
    _classCallCheck(this, NewsRepository);

    var _this = _possibleConstructorReturn(this, (NewsRepository.__proto__ || Object.getPrototypeOf(NewsRepository)).call(this));

    _this.model = db.news;
    _this.createFields = ['title', 'sub_title', 'body', 'tags', 'image', 'userId'];
    _this.updateFields = ['title', 'sub_title', 'body', 'tags', 'image', 'userId'];
    return _this;
  }

  _createClass(NewsRepository, [{
    key: 'findOneById',
    value: function findOneById(id) {
      return this.model.findOne({
        where: {
          id: id
        }
      });
    }
  }]);

  return NewsRepository;
}(_baseCrudRepository2.default);

exports.default = new NewsRepository();