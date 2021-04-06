import crypto from 'crypto';
import { CONSTANTS } from '../../configuration/config';

const encrypt = (text) => {
    var cipher = crypto.createCipher(CONSTANTS.ETHEREUM_CONFIG.encyptionConfig.algorithm, CONSTANTS.ETHEREUM_CONFIG.encyptionConfig.secret)
    var crypted = cipher.update(text, 'utf8', 'hex')
    crypted += cipher.final('hex');
    return crypted;
};

const decrypt = (hash) => {
    var decipher = crypto.createDecipher(CONSTANTS.ETHEREUM_CONFIG.encyptionConfig.algorithm, CONSTANTS.ETHEREUM_CONFIG.encyptionConfig.secret)
    var dec = decipher.update(hash, 'hex', 'utf8')
    dec += decipher.final('utf8');
    return dec;
};

export { encrypt, decrypt }