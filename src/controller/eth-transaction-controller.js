import { ABIValidator, contextMappingResolver, vaildateIdentity } from '../util/resolver-utils';
import { StatusCodes } from 'http-status-codes';
import loadash from 'lodash';
import EthereumService from '../service/eth-service';
import EntityRepository from '../repository/entity-repository';
import ConfigRepository from '../repository/config-repository';
import { CONSTANTS } from '../configuration/config';

class EthTransactionHandlerController {

    async createATrasaction(request, response, next) {
        let configurations;
        let address;
        let privateKey;
        let contextMappingParams;
        let contextType;
        let contextResponses;

        if("data" in request.body) {
            loadash.forEach(request.body.data, item => {
                contextResponses = item;
            });
        } else {
            contextResponses = request.body;
        }
       
        contextResponses = Buffer.isBuffer(contextResponses) ? JSON.parse(request.body.toString()) : contextResponses;
        if (Object.keys(contextResponses).length === 0) {
            let err = new Error();
            err.status = StatusCodes.FORBIDDEN;
            err.message = 'request body missing';
            return response.status(StatusCodes.FORBIDDEN).jsonp(err);
        }

        contextType = contextResponses.type;
        if(contextType == null || contextType == '') {
            let err = new Error();
            err.status = StatusCodes.FORBIDDEN;
            err.message = 'contextType is missing';
            return response.status(StatusCodes.FORBIDDEN).jsonp(err);
        }

        ConfigRepository.findAllCountAllByContextType(contextType)
            .then((configs) => {
                if (configs.count === 0) {
                    let err = new Error();
                    err.status = StatusCodes.NOT_FOUND;
                    err.message = 'config doesnt exists';
                    return response.status(StatusCodes.NOT_FOUND).jsonp(err);
                }
                configurations = configs.rows;
                return vaildateIdentity(request);
            })
            .then((identity) => {
                address = identity.address;
                privateKey = identity.privateKey;
                return contextMappingResolver(configurations, contextResponses);
            })
            .then((params) => {
                contextMappingParams = params;
                return ABIValidator(configurations, contextMappingParams);
            })
            .then(() => {
                return this.processTransaction(configurations, contextMappingParams, address, privateKey);
            })
            .then((recipts) => {
                let obj = [];
                recipts.forEach(recipt => {
                    recipt['objectType'] = contextType;
                    recipt['encyptionMode'] = CONSTANTS.ETHEREUM_CONFIG.encrpytionMode;
                    recipt['txSignMode'] = CONSTANTS.ETHEREUM_CONFIG.encrpytionMode;
                    recipt['contractAddress'] = configurations[0].metadata.contractAddress;
                    recipt['configId'] = configurations[0].id;
                    recipt['storageType'] = '';
                    recipt['keys'] = '';
                    delete recipt.events;
                    obj.push({entityId: contextResponses.id, txDetails: recipt});
                });   
                return EntityRepository.bulkcreate(obj);            
            })
            .then((txRecipt) => {
                return response.status(StatusCodes.OK).jsonp(txRecipt);
            })
            .catch((error) => {
                return response.status(StatusCodes.FORBIDDEN).jsonp(error);
            })
    }

    processTransaction(configuration, params, address, privateKey) {
        return new Promise((resolve, reject) => {
            configuration.forEach((config) => {
                let ethService = new EthereumService(config);
                // process transaction
                ethService.processTransaction(params, address, privateKey).then((result) => {
                    resolve(result);
                }).catch((error) => {
                    reject(error);
                });
            });           
        });
    }


    async readTransactionData() {

    }

    async retryTransaction() {

    }
}

export default new EthTransactionHandlerController();
