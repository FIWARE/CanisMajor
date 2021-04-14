import { StatusCodes } from 'http-status-codes';
import { createAsset, addMetaData } from './interface/aei-interface';
import { vaildateIdentity } from '../util/resolver-utils';
import EntityRepository from '../repository/entity-repository';
import { CONSTANTS , storageType } from '../configuration/config';
import { getMerkelRoot } from '../util/helper/merkle';
import { uploadToIPFS } from '../util/helper/ipfs';
import { publishToIOTA } from '../util/helper/iota';
import logger from '../util/logger';
import NestedKey from 'nested-keys';

class AEIContractController {

    async CreateAsset(request, response, next) {      
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
            if (CONSTANTS.ETHEREUM_CONFIG.storage_type == storageType.IPFS) {
                return uploadToIPFS(payload);
            }
            else if (CONSTANTS.ETHEREUM_CONFIG.storage_type == storageType.IOTA) {
                return publishToIOTA(payload);
            } else {
                return getMerkelRoot(payload);
            }
        })
        .then((value) => {
            return createAsset(payload.id, value, identity.address);
        })
        .then((res) => {
            res['storageType'] = CONSTANTS.ETHEREUM_CONFIG.storage_type;
            res['objectType'] = 'asset';
            res['encyptionMode'] = CONSTANTS.ETHEREUM_CONFIG.encrpytionMode;
            res['txSignMode'] = CONSTANTS.ETHEREUM_CONFIG.encrpytionMode;
            res['contractAddress'] = CONSTANTS.ETHEREUM_CONFIG.contractAddress;
            res['keys'] = keys;
            delete res.events;
            return EntityRepository.create({entityId: payload.id, txDetails: res});
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

    async AddMetaData(request, response, next) {
        let identity = vaildateIdentity(request);
        let id = request.params.id;
        let payload = {};
        let keys = [];
        let contextKeys = request.headers[CONSTANTS.HEADER.CONTEXT_MAPPING_KEYS];
        console.log(contextKeys);
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
            if (CONSTANTS.ETHEREUM_CONFIG.storage_type == storageType.IPFS) {
                return uploadToIPFS(payload);
            }
            else if (CONSTANTS.ETHEREUM_CONFIG.storage_type == storageType.IOTA) {
                return publishToIOTA(payload);
            } else {
                return getMerkelRoot(payload);
            }
        })
        .then((value) => {
            return addMetaData(id, value, identity.address);
        })
        .then((res) => {
            res['storageType'] = CONSTANTS.ETHEREUM_CONFIG.storage_type;
            res['objectType'] = 'metadata';
            res['encyptionMode'] = CONSTANTS.ETHEREUM_CONFIG.encrpytionMode;
            res['txSignMode'] = CONSTANTS.ETHEREUM_CONFIG.encrpytionMode;
            res['contractAddress'] = CONSTANTS.ETHEREUM_CONFIG.contractAddress;
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
