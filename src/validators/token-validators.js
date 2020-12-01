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

  validateKeyRock(request, response, next) {
    // fetch auth token
    const authToken = request.headers[HEADER.X_AUTH_TOKEN];
    if (!authToken) {
      var err = new Error();
      err.status = 403;
      return next(err);
    }
    // demo account creation example
    // let data = {
    //   publicAddress: '0xF8E6Bc44ea81c59759ECDFBb0327220C1831cc85',
    //   privateKey: '0x89a8cde453d6e05813ec7c044d003d99f97195b4cf61fd2ff987790812ddd593'
    // };
    // console.log(encrypt(JSON.stringify(data)));
        // check the account
    // let account = JSON.parse(decrypt(authToken));
    // if (typeof account.publicAddress == undefined || account.publicAddress == null || account.publicAddress == '') {
    //   var err = new Error();
    //   err.status = 403;
    //   err.message = 'child "' + HEADER.X_AUTH_TOKEN + '" fails because [' +
    //   HEADER.X_AUTH_TOKEN + ' is required]';
    //   return response.jsonp(err);
    // }

    //Send authToken to be validate by KeyRock
    return next();
  };
}

export default new TokenValidators();