'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _generalErrors = require('../services/error-services/general-errors');

var _generalErrors2 = _interopRequireDefault(_generalErrors);

var _objectFactory = require('../services/filtering-services/object-factory');

var _objectFactory2 = _interopRequireDefault(_objectFactory);

var _paginationOptions = require('../services/filtering-services/pagination-options');

var _paginationOptions2 = _interopRequireDefault(_paginationOptions);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var BaseCRUDController = function () {
  function BaseCRUDController() {
    _classCallCheck(this, BaseCRUDController);

    this.repository = null;
    this.filters = [];
  }

  _createClass(BaseCRUDController, [{
    key: 'getAll',
    value: function getAll(req, res, next) {
      return this.repository.findAndCountAll(options).then(function (entries) {
        res.jsonp(_paginationOptions2.default.findAllResponseObject(entries, req.query));
      }).catch(function (err) {
        _generalErrors2.default.addErrStatus(err, 422);

        return next(err);
      });
    }
  }, {
    key: 'allEntries',
    value: function allEntries(req, res, next) {
      var options = _objectFactory2.default.queryOptions(req.query, this.filters);

      return this.repository.findAndCountAllByFilter(options).then(function (entries) {
        res.jsonp(_paginationOptions2.default.findAllResponseObject(entries, req.query));
      }).catch(function (err) {
        _generalErrors2.default.addErrStatus(err, 422);

        return next(err);
      });
    }
  }, {
    key: 'oneSpecifiedEntry',
    value: function oneSpecifiedEntry(req, res, next) {
      return this.repository.findOneById(req.params.id).then(function (entry) {
        if (entry) {
          res.jsonp(entry);

          return null;
        }

        _generalErrors2.default.notFound();
      }).catch(function (err) {
        _generalErrors2.default.addErrStatus(err, 400);

        return next(err);
      });
    }
  }, {
    key: 'createEntry',
    value: function createEntry(req, res, next) {
      return this.repository.create(req.body).then(function (entry) {
        res.jsonp(entry);

        return null;
      }).catch(function (err) {
        _generalErrors2.default.addErrStatus(err, 422);

        return next(err);
      });
    }
  }, {
    key: 'updateEntry',
    value: function updateEntry(req, res, next) {
      var _this = this;

      return this.repository.findOneById(req.params.id).then(function (entry) {
        if (entry) {
          return _this.repository.update(entry, req.body);
        }

        _generalErrors2.default.notFound();
      }).then(function (updatedEntry) {
        res.jsonp(updatedEntry);

        return null;
      }).catch(function (err) {
        _generalErrors2.default.addErrStatus(err, 422);

        return next(err);
      });
    }
  }, {
    key: 'deleteEntry',
    value: function deleteEntry(req, res, next) {
      return this.repository.findOneById(req.params.id).then(function (entry) {
        if (entry) {
          return entry.destroy();
        }

        _generalErrors2.default.notFound();
      }).then(function () {
        return res.jsonp({
          success: true,
          message: 'deleted_successfully'
        });
      }).catch(function (err) {
        if (err.name === 'SequelizeForeignKeyConstraintError') {
          err.message = 'has_coach_attached';
          err.status = 400;

          return next(err);
        }
        _generalErrors2.default.addErrStatus(err, 400);

        return next(err);
      });
    }
  }]);

  return BaseCRUDController;
}();

exports.default = BaseCRUDController;