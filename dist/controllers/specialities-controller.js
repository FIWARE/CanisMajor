'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _baseCrudController = require('./base-crud-controller');

var _baseCrudController2 = _interopRequireDefault(_baseCrudController);

var _specialitiesRepository = require('../repositories/specialities-repository');

var _specialitiesRepository2 = _interopRequireDefault(_specialitiesRepository);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SpecialitiesController = function (_BaseCRUDController) {
  _inherits(SpecialitiesController, _BaseCRUDController);

  function SpecialitiesController() {
    _classCallCheck(this, SpecialitiesController);

    var _this = _possibleConstructorReturn(this, (SpecialitiesController.__proto__ || Object.getPrototypeOf(SpecialitiesController)).call(this));

    _this.repository = _specialitiesRepository2.default;
    _this.filters = ['id', 'label'];
    return _this;
  }

  return SpecialitiesController;
}(_baseCrudController2.default);

exports.default = new SpecialitiesController();