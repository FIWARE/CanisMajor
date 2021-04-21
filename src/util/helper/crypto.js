import crypto from 'crypto';
import { ENCYPTION_CONFIG } from '../../configuration/config';

const encrypt = (text) => {
    var cipher = crypto.createCipher(ENCYPTION_CONFIG.encyptionConfig.algorithm, ENCYPTION_CONFIG.encyptionConfig.secret)
    var crypted = cipher.update(text, 'utf8', 'hex')
    crypted += cipher.final('hex');
    return crypted;
};

const decrypt = (hash) => {
    var decipher = crypto.createDecipher(ENCYPTION_CONFIG.encyptionConfig.algorithm, ENCYPTION_CONFIG.encyptionConfig.secret)
    var dec = decipher.update(hash, 'hex', 'utf8')
    dec += decipher.final('utf8');
    return dec;
};

export { encrypt, decrypt }