'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _generalErrors = require('../error-services/general-errors');

var _generalErrors2 = _interopRequireDefault(_generalErrors);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var GeneralFactories = function () {
  function GeneralFactories() {
    _classCallCheck(this, GeneralFactories);
  }

  _createClass(GeneralFactories, [{
    key: 'changeIfHasProperty',
    value: function changeIfHasProperty(firstObject, newObject, property) {
      if (newObject.hasOwnProperty(property)) {
        return newObject[property];
      }

      return firstObject[property];
    }

    /**
     * verify if an object has specified fields
     * @param  {Object} object object to verify
     * @param  {Array} fields needed fields
     * @throws {error} throws error for missing fields
     */

  }, {
    key: 'verifyObjectHasFields',
    value: function verifyObjectHasFields(object, fields) {
      var missingFields = [];
      _lodash2.default.map(fields, function (field) {
        if (!object.hasOwnProperty(field)) {
          missingFields.push(field);
        }
      });

      if (missingFields.length >= 1) {
        _generalErrors2.default.unprocessableEntityWrongFields(missingFields, null);
      }
    }
  }, {
    key: 'assignArrayToProperty',
    value: function assignArrayToProperty(propertyName, response) {
      return _defineProperty({}, propertyName, response);
    }
  }, {
    key: 'deletePropertiesFromObject',
    value: function deletePropertiesFromObject(object, properties) {
      _lodash2.default.map(properties, function (property) {
        if (object.hasOwnProperty(property)) {
          delete object[property];
        }
      });
    }
  }, {
    key: 'deletePropertiesFromSequelizeResponseObject',
    value: function deletePropertiesFromSequelizeResponseObject(object, propertiesArray) {
      _lodash2.default.map(propertiesArray, function (property) {
        if (object.dataValues && object.dataValues.hasOwnProperty(property)) {
          delete object.dataValues[property];
        }
      });
    }
  }]);

  return GeneralFactories;
}();

exports.default = new GeneralFactories();