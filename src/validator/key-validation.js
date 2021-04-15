import { CONSTANTS, DLT_TYPE, DLTType } from '../configuration/config';
import Web3 from 'web3';
const web3 = new Web3();
/*
** Middleware to authenicate headers and validate request
*/
class DLTKeyValidators {
  validate(request, response, next) {
    // fetch auth token
    const DLT_TOKEN = request.headers[CONSTANTS.HEADER.DLT_TOKEN];
    if (typeof DLT_TOKEN == undefined || DLT_TOKEN == null || DLT_TOKEN == '') {
      const err = new Error();
      err.status = 403;
      err.message = CONSTANTS.HEADER.DLT_TOKEN + ' is missing';
      return response.status(403).jsonp(err);
    }
    let keys = Buffer.from(DLT_TOKEN, 'base64').toString();
    keys = keys.split(':');
    
    if (DLT_TYPE == DLTType.ETHEREUM) {
      if (!web3.utils.isAddress(keys[0])) {
        const err = new Error();
        err.status = 403;
        err.message = 'Invalid account address';
        return response.status(403).jsonp(err);
      }
      // will be enabled on privatekey signed tx
      // let wallet = web3.eth.accounts.privateKeyToAccount(keys[1]);
      // if(wallet.address != keys[0]) {
      //     const err = new Error();
      //     err.status = 403;
      //     err.message = 'Invalid account details please check DLT-Token Header';
      //     return response.status(403).jsonp(err);
      // }
    } else if (DLT_TYPE == DLTType.IOTA) {
      // seed length is always 81
      if(keys[0].length != 81 && keys[1].length != 81) {
        const err = new Error();
        err.status = 403;
        err.message = 'Invalid IOTA account address or seed';
        return response.status(403).jsonp(err);
      }
    }
    return next();
  }
}

export default new DLTKeyValidators();