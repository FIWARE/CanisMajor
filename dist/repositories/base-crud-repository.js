"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _generalFactories = require("../services/factories/general-factories");

var _generalFactories2 = _interopRequireDefault(_generalFactories);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var BaseCRUDRepository = function () {
  function BaseCRUDRepository() {
    _classCallCheck(this, BaseCRUDRepository);

    this.model = null;
    this.createFields = ["coachId", "userId", "dateTime"];
    this.updateFields = ["dateTime", "status", "feedback", "rating", "coachNotes", "userNotes"];
  }

  _createClass(BaseCRUDRepository, [{
    key: "findOneById",
    value: function findOneById(id) {
      return this.model.findOne({
        where: {
          id: id
        }
      });
    }
  }, {
    key: "findAndCountAllByFilter",
    value: function findAndCountAllByFilter(options) {
      return this.model.findAndCountAll({
        where: options.filters,
        order: options.sorting,
        offset: options.pagination.offset,
        limit: options.pagination.limit
      });
    }
  }, {
    key: "create",
    value: function create(entry) {
      var createObject = {};
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = this.createFields[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var key = _step.value;

          createObject[key] = entry[key];
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      return this.model.create(createObject);
    }
  }, {
    key: "update",
    value: function update(entry, updateEntry) {
      var updateObject = {};
      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = this.updateFields[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var key = _step2.value;

          updateObject[key] = _generalFactories2.default.changeIfHasProperty(entry, updateEntry, key);
        }
      } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion2 && _iterator2.return) {
            _iterator2.return();
          }
        } finally {
          if (_didIteratorError2) {
            throw _iteratorError2;
          }
        }
      }

      return entry.updateAttributes(updateObject);
    }
  }]);

  return BaseCRUDRepository;
}();

exports.default = BaseCRUDRepository;