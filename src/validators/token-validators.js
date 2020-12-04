import { CONSTANTS } from '../configuration/config';

/*
** Middleware to authenicate headers and validate request
*/

class TokenValidators {
  validate(request, response, next) {
    // fetch auth token
    const publicAddress = request.headers[CONSTANTS.HEADER.X_ETH_PUBLIC_ADDRESS];
    if (!publicAddress) {
      const err = new Error();
      err.status = 403;
      err.message = 'child "' + CONSTANTS.HEADER.X_ETH_PUBLIC_ADDRESS + '" fails because [' +
      CONSTANTS.HEADER.X_ETH_PUBLIC_ADDRESS + ' is required]';
      return next(err);
    }
    if (typeof publicAddress == undefined || publicAddress == null || publicAddress == '') {
      const err = new Error();
      err.status = 403;
      err.message = 'child "' + CONSTANTS.HEADER.X_ETH_PUBLIC_ADDRESS + '" fails because [' +
      CONSTANTS.HEADER.X_ETH_PUBLIC_ADDRESS + ' is required]';
      return response.jsonp(err);
    }
    return next();
  };
}

export default new TokenValidators();