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

var TemplatesRepository = function (_BaseCRUDRepository) {
  _inherits(TemplatesRepository, _BaseCRUDRepository);

  function TemplatesRepository() {
    _classCallCheck(this, TemplatesRepository);

    var _this = _possibleConstructorReturn(this, (TemplatesRepository.__proto__ || Object.getPrototypeOf(TemplatesRepository)).call(this));

    _this.model = db.template;
    _this.createFields = ['type', 'template', 'subject'];
    _this.updateFields = ['type', 'template', 'subject'];
    return _this;
  }

  _createClass(TemplatesRepository, [{
    key: 'findOneByType',
    value: function findOneByType(type) {
      return this.model.findOne({
        where: {
          type: type
        }
      });
    }
  }]);

  return TemplatesRepository;
}(_baseCrudRepository2.default);

exports.default = new TemplatesRepository();