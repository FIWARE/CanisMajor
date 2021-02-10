import { CONSTANTS } from '../configuration/config';
import JWTTokenController from '../controller/jwt-controller';
import Web3 from 'web3';
const web3 = new Web3();
/*
** Middleware to authenicate headers and validate request
*/

class TokenValidators {
  validate(request, response, next) {
    // fetch auth token
    const X_AUTH_TOKEN = request.headers[CONSTANTS.HEADER.X_AUTH_TOKEN];
    if (typeof X_AUTH_TOKEN == undefined || X_AUTH_TOKEN == null || X_AUTH_TOKEN == '') {
      const err = new Error();
      err.status = 403;
      err.message = CONSTANTS.HEADER.X_AUTH_TOKEN + ' is missing';
      return response.status(403).jsonp(err);
    }

    JWTTokenController.verifyJWT(X_AUTH_TOKEN).then(() => {
      return next();
    }).catch((err) => {
      return response.status(403).jsonp(err);
    })
  }
}

export default new TokenValidators();