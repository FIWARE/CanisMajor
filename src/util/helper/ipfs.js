import IPFS from 'ipfs-api';
import { STORAGE_CONFIGURATION } from '../../configuration/config';
import { encrypt, decrypt } from './crypto';
const ipfs = new IPFS(STORAGE_CONFIGURATION.ipfsConfig);

const uploadToIPFS = (payload) => {
    return new Promise((resolve, reject) => {
        let data = payload;
        ipfs.dag.put(data, STORAGE_CONFIGURATION.ipfsConfig.dagOptions).then((cid) => {
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
