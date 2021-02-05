import { CONSTANTS } from '../configuration/config';
import generalErrors from '../util/factory/general-errors';
import JWT from 'jsonwebtoken';
import Web3 from 'web3';
const web3 = new Web3();

class JWTHandlerController {

  /**
   * Generate JWT Token
   * @param {Object}   request The request
   * @param {Object} response  the response
   */
  generateJWT(request, response) {

    if (request.body.address == null || request.body.address == '') {
      return response.status(400).jsonp(generalErrors.badRequest('address is missing'));
    }

    if (request.body.privateKey == null || request.body.privateKey == '') {
      return response.status(400).jsonp(generalErrors.badRequest('private key is required'));
    }

    let keys = web3.eth.accounts.privateKeyToAccount(request.body.privateKey);
    if (request.body.address != keys.address) {
      const err = new Error();
      err.status = 403;
      err.message = 'invalid Account Please check the address and privateKey';
      return response.status(403).jsonp(err);
    }

    let data = {
      address: request.body.address,
      privateKey: request.body.privateKey
    }
    var token = JWT.sign(data, CONSTANTS.JWT_ALGORITHMS.SECRET);
    return response.status(200).jsonp({ JWT: token });
  }

  /**
   * Verify JWT
   * @param {String} JWTToken 
   */
  verifyJWT(token) {
      return new Promise((resolve, reject) => {
        JWT.verify(token, CONSTANTS.JWT_ALGORITHMS.SECRET, (error, keys) => {   
          if(error) {
            reject(error);
          }
          if ('privateKey' in keys) {
            let data = web3.eth.accounts.privateKeyToAccount(keys.privateKey);
            if(data.address == keys.address) {
              resolve(data);
            } else {
              const err = new Error();
              err.status = 403;
              err.message = 'invalid Account Please check the address and privateKey';
              reject();
            }
          } else {
            const err = new Error();
            err.status = 403;
            err.message = 'incorrect JWT Token';
            reject(err);
          }
        });

      });
  }
}

export default new JWTHandlerController();
