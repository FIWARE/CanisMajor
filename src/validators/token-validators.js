// import { encrypt, decrypt } from '../helpers/crypto-resolve-helpers';
import { HEADER } from '../utils/constant';

/*
** Middleware to authenicate headers and validate request
*/

class TokenValidators {
  validate(request, response, next) {
    // fetch auth token
    const publicAddress = request.headers[HEADER.X_ETH_PUBLIC_ADDRESS];
    if (!publicAddress) {
      var err = new Error();
      err.status = 403;
      err.message = 'child "' + HEADER.X_ETH_PUBLIC_ADDRESS + '" fails because [' +
      HEADER.X_ETH_PUBLIC_ADDRESS + ' is required]';
      return next(err);
    }
    if (typeof publicAddress == undefined || publicAddress == null || publicAddress == '') {
      var err = new Error();
      err.status = 403;
      err.message = 'child "' + HEADER.X_ETH_PUBLIC_ADDRESS + '" fails because [' +
      HEADER.X_ETH_PUBLIC_ADDRESS + ' is required]';
      return response.jsonp(err);
    }
    return next();
  };
}

export default new TokenValidators();