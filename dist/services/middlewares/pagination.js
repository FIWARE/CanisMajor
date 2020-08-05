'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var PaginationMiddleware = function () {
  function PaginationMiddleware() {
    _classCallCheck(this, PaginationMiddleware);

    this.middleware = this.middleware.bind(this);
  }

  _createClass(PaginationMiddleware, [{
    key: '_isInt',
    value: function _isInt(value) {
      if (isNaN(value)) {
        return false;
      }
      var x = parseFloat(value);

      return (x | 0) === x;
    }
  }, {
    key: '_addDefaultPagination',
    value: function _addDefaultPagination(req) {
      if (!req.query.page) {
        req.query.page = 0;
      }
      if (!req.query.perPage) {
        req.query.perPage = 25;
      }
    }
  }, {
    key: '_validatePage',
    value: function _validatePage(req) {
      if (this._isInt(req.query.page) && parseFloat(req.query.page) >= 0) {
        req.query.page = parseFloat(req.query.page);
      } else {
        var err = new Error();
        err.message = 'page_query_invalid';
        err.status = 422;

        throw err;
      }
    }
  }, {
    key: '_validatePerPage',
    value: function _validatePerPage(req) {
      if (this._isInt(req.query.perPage) && parseFloat(req.query.perPage) >= 0 && parseFloat(req.query.perPage) <= 100) {
        req.query.perPage = parseFloat(req.query.perPage);
      } else {
        var err = new Error();
        err.message = 'perPage_query_invalid';
        err.status = 422;

        throw err;
      }
    }
  }, {
    key: 'middleware',
    value: function middleware(req, res, next) {
      this._addDefaultPagination(req);

      try {
        this._validatePage(req);
        this._validatePerPage(req);
      } catch (err) {
        return next(err);
      }

      return next();
    }
  }]);

  return PaginationMiddleware;
}();

exports.default = new PaginationMiddleware();