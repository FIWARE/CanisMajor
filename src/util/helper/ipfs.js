import IPFS from 'ipfs-api';
import { CONSTANTS } from '../../configuration/config';
import { encrypt, decrypt } from './crypto';
const ipfs = new IPFS(CONSTANTS.ETHEREUM_CONFIG.ipfsConfig);

const uploadToIPFS = (payload) => {
    return new Promise((resolve, reject) => {
        let data;
        if (CONSTANTS.ETHEREUM_CONFIG.encrpytionMode) {
            data = encrypt(JSON.stringify(payload));
        } else {
            data = payload;
        }
        ipfs.dag.put(data, CONSTANTS.ETHEREUM_CONFIG.ipfsConfig.dagOptions).then((cid) => {
            resolve(cid.toString());
        }).catch((err) => {
            reject(err);
        });
    });
};

const getFromIPFS = (cid) => {
    return new Promise((resolve, reject) => {
        ipfs.dag.get(cid).then((res) => {
                resolve(res.value);    
        }).catch((err) => {
            reject(err);
        });
    });
};

export { uploadToIPFS, getFromIPFS }
