'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _baseCrudController = require('./base-crud-controller');

var _baseCrudController2 = _interopRequireDefault(_baseCrudController);

var _templatesRepository = require('../repositories/templates-repository');

var _templatesRepository2 = _interopRequireDefault(_templatesRepository);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TemplatesController = function (_BaseCRUDController) {
  _inherits(TemplatesController, _BaseCRUDController);

  function TemplatesController() {
    _classCallCheck(this, TemplatesController);

    var _this = _possibleConstructorReturn(this, (TemplatesController.__proto__ || Object.getPrototypeOf(TemplatesController)).call(this));

    _this.repository = _templatesRepository2.default;
    _this.filters = ['type'];
    return _this;
  }

  return TemplatesController;
}(_baseCrudController2.default);

exports.default = new TemplatesController();