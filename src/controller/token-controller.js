import { encrypt, decrypt } from '../util/helper/crypto';
import {CM_SECRET, DLT_TYPE, DLTType} from '../configuration/config';
import { StatusCodes } from 'http-status-codes';
import Web3 from 'web3';
const web3 = new Web3();

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

    // key validation
    if (DLT_TYPE == DLTType.ETHEREUM) {
      if (!web3.utils.isAddress(request.body.public_key)) {
        const err = new Error();
        err.status = 403;
        err.message = 'Invalid account address';
        return response.status(403).jsonp(err);
      }
      // will be enabled on privatekey signed tx
      let wallet = web3.eth.accounts.privateKeyToAccount(request.body.private_key);
      if(wallet.address != request.body.public_key) {
          const err = new Error();
          err.status = 403;
          err.message = 'Invalid account details please check DLT-Token Header';
          return response.status(403).jsonp(err);
      }
    } else if (DLT_TYPE == DLTType.IOTA) {
      // seed length is always 81
      if(request.body.public_key.length != 81 && request.body.private_key.length != 81) {
        const err = new Error();
        err.status = 403;
        err.message = 'Invalid IOTA account address or seed';
        return response.status(403).jsonp(err);
      }
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
