'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var FilterObject = function () {
  function FilterObject() {
    _classCallCheck(this, FilterObject);
  }

  _createClass(FilterObject, [{
    key: 'filterObject',

    // first parameter is for req.query and second for the fields that you need to create on the filterObject.
    value: function filterObject(queryStrings, fieldNamesToFilterArray) {
      var filterObject = {};

      if (_lodash2.default.isEmpty(queryStrings)) {
        return filterObject;
      }

      fieldNamesToFilterArray.forEach(function (value) {
        if (queryStrings[value]) {
          filterObject[value] = queryStrings[value];
        }
      });

      return filterObject;
    }
  }, {
    key: 'sortingObject',
    value: function sortingObject(queryString) {
      var sortingOrder = [];
      var sortingString = queryString.sort;

      // if no sorting query params are defined, default:  id, ASC
      if (!sortingString) {
        return [['id', 'ASC']];
      }
      var sortingArray = sortingString.split(",");
      for (var i = 0; i < sortingArray.length; i++) {
        var sortType = "ASC";

        if (_lodash2.default.head(sortingArray[i]) === "-") {
          sortingArray[i] = sortingArray[i].slice(1);
          sortType = "DESC";
        }

        var object = [];
        object.push(sortingArray[i]);
        object.push(sortType);

        sortingOrder.push(object);
      }

      if (sortingOrder.length == 0) {
        return [['id', 'ASC']];
      }

      return sortingOrder;
    }
  }, {
    key: 'addSearchText',
    value: function addSearchText(queryString) {
      if (queryString.search) {
        return queryString.search;
      }

      return null;
    }
  }, {
    key: 'addRelationDetails',
    value: function addRelationDetails(queryString) {
      if (queryString.relations == 'true') {
        return null;
      }

      return [];
    }
  }]);

  return FilterObject;
}();

exports.default = new FilterObject();