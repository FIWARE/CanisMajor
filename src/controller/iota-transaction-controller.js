import { composeAPI } from '@iota/core';
import { asciiToTrytes } from '@iota/converter';
import { DLT_CONFIGURATION, DLT_TYPE, ENCYPTION_CONFIG, CONSTANTS, STORAGE_CONFIGURATION } from '../configuration/config';
import { StatusCodes } from 'http-status-codes';
import { vaildateIdentity } from '../util/resolver-utils';
import logger from '../util/logger';
import NestedKey from 'nested-keys';
import EntityRepository from '../repository/entity-repository';

const iota = composeAPI({
    provider: DLT_CONFIGURATION.IOTA_CONFIG.endpoint
});
const depth = 3;
const minimumWeightMagnitude = 9;

class IOTATransactionHandlerController {

    async createATrasaction(request, response, next) {
        let identity = vaildateIdentity(request);
        let payload = {};
        let keys = [];
        let contextKeys = request.headers[CONSTANTS.HEADER.CONTEXT_MAPPING_KEYS];
        if (contextKeys == null || contextKeys == '') {
            payload = request.body;
        } else {
            contextKeys = contextKeys.split(',');
            contextKeys.forEach(element => {
                payload[element] = NestedKey.get(request.body, element);
            });
            payload['@context'] = NestedKey.get(request.body, '@context');
            payload['id'] = NestedKey.get(request.body, 'id');
        }

        for (let key in payload) {
            keys.push(key);
        }
        let data = Buffer.from(JSON.stringify(payload), 'utf-8').toString('base64');
        const trytes = asciiToTrytes(data);

        const payloadTryte = [{
            value: 0,
            address: identity.address,
            message: trytes
        }];

        iota.prepareTransfers(identity.privateKey, payloadTryte)
            .then((trytes) => {
                return iota.sendTrytes(trytes, depth, minimumWeightMagnitude);
            })
            .then((bundle) => {
                let recipt = bundle[0];
                recipt['dltType'] = DLT_TYPE;
                recipt['storageType'] = STORAGE_CONFIGURATION.storage_type;
                recipt['objectType'] = request.body.type;
                recipt['encyptionMode'] = ENCYPTION_CONFIG.encrpytionMode;
                recipt['txSignMode'] = ENCYPTION_CONFIG.txSignMode;
                recipt['keys'] = keys;
                return EntityRepository.create({ entityId: request.body.id, txDetails: recipt });
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

export default new IOTATransactionHandlerController();