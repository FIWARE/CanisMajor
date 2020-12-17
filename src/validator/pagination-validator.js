class PaginationValidator {
    constructor() {
      this.middleware = this.middleware.bind(this);
    }
  
    _isInt(value) {
      if (isNaN(value)) {
        return false;
      }
      var x = parseFloat(value);
  
      return (x | 0) === x;
    }
  
    _addDefaultPagination(req) {
      if(!req.query.offset) {
        req.query.offset = 0;
      }
      if(!req.query.limit) {
          req.query.limit = 25;
      }
    }
  
    _validateOffset(req) {
      if ((this._isInt(req.query.offset)) && (parseFloat(req.query.offset) >= 0)) {
        req.query.offset = parseFloat(req.query.offset);
      } else {
        var err = new Error();
        err.message = ('offset_query_invalid');
        err.status = 422;
  
        throw err;
      }
    }
  
    _validateLimit(req) {
      if ((this._isInt(req.query.limit)) && (parseFloat(req.query.limit)>=0) && (parseFloat(req.query.limit) <= 100)) {
        req.query.limit = parseFloat(req.query.limit);
      } else {
        var err = new Error();
        err.message = ('limit_query_invalid');
        err.status = 422;
  
        throw err;
      }
    }
  
    middleware(req, res, next) {
      this._addDefaultPagination(req);
  
      try {
        this._validateOffset(req);
        this._validateLimit(req);
      }
      catch (err) {
        return next(err);
      }
  
      return next();
    }
  }
  
  export default new PaginationValidator();
  