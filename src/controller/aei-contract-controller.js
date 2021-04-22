import { StatusCodes } from 'http-status-codes';
import { createAsset, addMetaData } from './interface/aei-interface';
import { vaildateIdentity } from '../util/resolver-utils';
import EntityRepository from '../repository/entity-repository';
import { CONSTANTS , DLT_CONFIGURATION , ENCYPTION_CONFIG, storageType, DLT_TYPE, STORAGE_CONFIGURATION } from '../configuration/config';
import { getMerkelRoot } from '../util/helper/merkle';
import { uploadToIPFS } from '../util/helper/ipfs';
import { publishToIOTA } from '../util/helper/iota';
import logger from '../util/logger';
import NestedKey from 'nested-keys';

class AEIContractController {

    async CreateAsset(request, response, next) {  
        console.log('creating asset');    
        let identity = vaildateIdentity(request);
        let payload = {};
        let keys = [];
        let contextKeys = request.headers[CONSTANTS.HEADER.CONTEXT_MAPPING_KEYS];
        if(contextKeys == null || contextKeys == '') {
            payload = request.body;
        } else {
            contextKeys = contextKeys.split(',');
            contextKeys.forEach(element => {
                payload[element] = NestedKey.get(request.body,element);
            });
            payload['@context'] = NestedKey.get(request.body, '@context');
            payload['id'] = NestedKey.get(request.body, 'id');
        }
        
        for (let key in payload) {
            keys.push(key);
        }

        return Promise.resolve().then(() => {
            if (STORAGE_CONFIGURATION.storage_type == storageType.IPFS) {
                return uploadToIPFS(payload);
            }
            else if (STORAGE_CONFIGURATION.storage_type == storageType.IOTA) {
                return publishToIOTA(payload);
            } else {
                return getMerkelRoot(payload);
            }
        })
        .then((value) => {
            console.log('hash value'+ value); 
            return createAsset(payload.id, value, identity);
        })
        .then((res) => {
            console.log('recipt'+ res); 
            res['dltType'] = DLT_TYPE;
            res['storageType'] = STORAGE_CONFIGURATION.storage_type;
            res['objectType'] = 'asset';
            res['encyptionMode'] = ENCYPTION_CONFIG.encrpytionMode;
            res['txSignMode'] = ENCYPTION_CONFIG.txSignMode;
            res['contractAddress'] = DLT_CONFIGURATION.ETHEREUM_CONFIG.contractAddress;
            res['keys'] = keys;
            delete res.events;
            return EntityRepository.create({entityId: payload.id, txDetails: res});
        })
        .then((result) => {
            console.log('result'+ result); 
            logger.info(result);
            return response.status(StatusCodes.CREATED).jsonp(result);
        })     
        .catch((err) => {
            console.log('err'+ err); 
            logger.error(err);
            return response.status(StatusCodes.BAD_REQUEST).jsonp(err);
        });
    }

    async AddMetaData(request, response, next) {
        let identity = vaildateIdentity(request);
        let id = request.params.id;
        let payload = {};
        let keys = [];
        let contextKeys = request.headers[CONSTANTS.HEADER.CONTEXT_MAPPING_KEYS];
        if(contextKeys == null || contextKeys == '') {
            payload = request.body;
        } else {
            contextKeys = contextKeys.split(',');
            contextKeys.forEach(element => {
                payload[element] = NestedKey.get(request.body,element);
            });
            payload['@context'] = NestedKey.get(request.body, '@context');
        }

        for (let key in payload) {
            keys.push(key);
        }
        return Promise.resolve().then(() => {
            if (STORAGE_CONFIGURATION.storage_type == storageType.IPFS) {
                return uploadToIPFS(payload);
            }
            else if (STORAGE_CONFIGURATION.storage_type == storageType.IOTA) {
                return publishToIOTA(payload);
            } else {
                return getMerkelRoot(payload);
            }
        })
        .then((value) => {
            return addMetaData(id, value, identity);
        })
        .then((res) => {
            res['dltType'] = DLT_TYPE;
            res['storageType'] = STORAGE_CONFIGURATION.storage_type;
            res['objectType'] = 'metadata';
            res['encyptionMode'] = ENCYPTION_CONFIG.encrpytionMode;
            res['txSignMode'] = ENCYPTION_CONFIG.encrpytionMode;
            res['contractAddress'] = DLT_CONFIGURATION.ETHEREUM_CONFIG.contractAddress;
            res['keys'] = keys;
            delete res.events;
            return EntityRepository.create({entityId: id, txDetails: res});
        })
        .then((result) => {
            logger.info(result);
            return response.status(StatusCodes.CREATED).jsonp(result);
        })   
        .catch((err) => {
            logger.error(err);
            return response.status(StatusCodes.BAD_REQUEST).jsonp(err);
        });
    }
}

export default new AEIContractController();
