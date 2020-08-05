
import * as crypto from 'crypto';
import { util_configuration } from '../config/config.json';
import constant from '../config/constant';

// resolver to be written correctly
const  encrypt = (input) => {

    if (util_configuration.encryption_algorithm == constant.ENCRYPTION_ALGORITHMS.AES_256_CTR) {
        var cipher = crypto.createCipher(constant.ENCRYPTION_ALGORITHMS.AES_256_CTR, util_configuration.encryption_key)
        var crypted = cipher.update(input,'utf8','hex')
        crypted += cipher.final('hex');
        return crypted;
    }
}

const  decrypt = (input) => {
    if (util_configuration.encryption_algorithm === constant.ENCRYPTION_ALGORITHMS.AES_256_CTR) {
        var decipher = crypto.createDecipher(constant.ENCRYPTION_ALGORITHMS.AES_256_CTR, util_configuration.encryption_key)
        var dec = decipher.update(input,'hex','utf8')
        dec += decipher.final('utf8');
        return dec;
    }
}

export {
   encrypt,
   decrypt,
}