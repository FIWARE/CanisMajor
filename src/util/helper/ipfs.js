import { create } from 'ipfs-http-client';

import { STORAGE_CONFIGURATION } from '../../configuration/config';
import { encrypt, decrypt } from './crypto';

const client = create(STORAGE_CONFIGURATION.ipfsConfig);

const uploadToIPFS = (payload) => {
    return new Promise((resolve, reject) => {
        let data = Buffer.from(JSON.stringify(payload), 'utf-8').toString('base64');
        client.dag.put(data, STORAGE_CONFIGURATION.ipfsConfig.dagOptions).then((cid) => {
            resolve(cid.toString());
        }).catch((err) => {
            reject(err);
        });
    });
};

const getFromIPFS = (cid) => {
    return new Promise((resolve, reject) => {
        client.dag.get(cid).then((res) => {
        let data = Buffer.from(res.value, 'base64').toString('utf-8');
            resolve(JSON.parse(data));    
        }).catch((err) => {
            reject(err);
        });
    });
};

export { uploadToIPFS, getFromIPFS }
