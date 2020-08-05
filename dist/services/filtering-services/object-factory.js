'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _filter = require('./filter');

var _filter2 = _interopRequireDefault(_filter);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ObjectFactory = function () {
  function ObjectFactory() {
    _classCallCheck(this, ObjectFactory);
  }

  _createClass(ObjectFactory, [{
    key: '_addPaginationOptions',
    value: function _addPaginationOptions(queryString) {
      return {
        limit: queryString.perPage,
        offset: queryString.perPage * queryString.page
      };
    }
  }, {
    key: 'queryOptions',
    value: function queryOptions(queryString, sortingArray) {
      var options = {};
      options.pagination = this._addPaginationOptions(queryString);
      options.filters = _filter2.default.filterObject(queryString, sortingArray);
      options.sorting = _filter2.default.sortingObject(queryString);
      options.relations = _filter2.default.addRelationDetails(queryString);
      options.search = _filter2.default.addSearchText(queryString);

      return options;
    }
  }]);

  return ObjectFactory;
}();

exports.default = new ObjectFactory();