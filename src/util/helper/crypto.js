import crypto from 'crypto';
import { ENCYPTION_CONFIG } from '../../configuration/config';

const encrypt = (text, secret) => {
    var cipher = crypto.createCipher(ENCYPTION_CONFIG.encyptionConfig.algorithm,secret)
    var crypted = cipher.update(text, 'utf8', 'hex')
    crypted += cipher.final('hex');
    return crypted;
};

const decrypt = (hash, secret) => {
    var decipher = crypto.createDecipher(ENCYPTION_CONFIG.encyptionConfig.algorithm, secret)
    var dec = decipher.update(hash, 'hex', 'utf8')
    dec += decipher.final('utf8');
    return dec;
};

export { encrypt, decrypt }