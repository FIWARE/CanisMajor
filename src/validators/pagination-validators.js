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
      if(!req.query.page) {
        req.query.page = 0;
      }
      if(!req.query.perPage) {
          req.query.perPage = 25;
      }
    }
  
    _validatePage(req) {
      if ((this._isInt(req.query.page)) && (parseFloat(req.query.page) >= 0)) {
        req.query.page = parseFloat(req.query.page);
      } else {
        var err = new Error();
        err.message = ('page_query_invalid');
        err.status = 422;
  
        throw err;
      }
    }
  
    _validatePerPage(req) {
      if ((this._isInt(req.query.perPage)) && (parseFloat(req.query.perPage)>=0) && (parseFloat(req.query.perPage) <= 100)) {
        req.query.perPage = parseFloat(req.query.perPage);
      } else {
        var err = new Error();
        err.message = ('perPage_query_invalid');
        err.status = 422;
  
        throw err;
      }
    }
  
    middleware(req, res, next) {
      this._addDefaultPagination(req);
  
      try {
        this._validatePage(req);
        this._validatePerPage(req);
      }
      catch (err) {
        return next(err);
      }
  
      return next();
    }
  }
  
  export default new PaginationValidator();
  