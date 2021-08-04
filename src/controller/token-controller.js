import { encrypt, decrypt } from '../util/helper/crypto';
import {CM_SECRET} from '../configuration/config';
import { StatusCodes } from 'http-status-codes';

class TokenHandlerController {

/**
 * Handler for version requests
 * @param {Object}   request The request
 * @param {Object} response  the response
 */
  generateToken(request, response) {

    if(request.body.public_key == null || request.body.public_key == '') {
      return response.status(StatusCodes.BAD_REQUEST).jsonp({'message': 'public_key is missing'});
    }

    if(request.body.private_key == null || request.body.private_key == '') {
      return response.status(StatusCodes.BAD_REQUEST).jsonp({'message': 'private_key is missing'});
    }

    // public_key:private_key base64 encoding
    let base64 = Buffer.from(request.body.public_key + ':' + request.body.private_key).toString('base64');
    // encryption with secret
    let token = encrypt(base64, CM_SECRET);
    return response.jsonp({
      'dlt-token': token
    });
  }

  tokenInfo(request, response) {
    let token = request.body['dlt-token'];
    if(token == null || token == '') {
      return response.status(StatusCodes.BAD_REQUEST).jsonp({'message': 'dlt_key is missing'});
    }
    let base64 = decrypt(token, CM_SECRET);
    // public_key:private_key base64 encoding
    let keys = Buffer.from(base64, 'base64').toString();
    keys = keys.split(':');
    // encryption with secret
    
    return response.jsonp({
      public_key: keys[0],
      private_key: keys[1]
    });
  }
}

export default new TokenHandlerController();
