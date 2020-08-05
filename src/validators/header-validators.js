import { HEADER } from '../config/constant';

class HeaderValidators {
  /**
   * Header validation handler
   * @param value The headers
   * @param options Possible options
   * @param next The header validation next() function
   * @return {*} This function does not return anything of interest
   */
  validate(request, response, next) {
    if (!request.headers[HEADER.FIWARE_SERVICE]) {
      var err = new Error();
      err.status = 403;
      err.message = 'child "' + HEADER.FIWARE_SERVICE + '" fails because [' +
        HEADER.FIWARE_SERVICE + ' is required]';
      return response.jsonp(err);
    } else if (!request.headers[HEADER.FIWARE_SERVICE_PATH]) {
      var err = new Error();
      err.status = 403;
      err.message = 'child "' + HEADER.FIWARE_SERVICE_PATH + '" fails because [' +
        HEADER.FIWARE_SERVICE_PATH + ' is required]';
      return response.jsonp(err);
    }
    return next();
  }
}

export default new HeaderValidators();
