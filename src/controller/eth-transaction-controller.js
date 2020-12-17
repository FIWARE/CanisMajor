import { StatusCodes } from 'http-status-codes';
import { ABIValidator, dltConfigResolver, contextMappingResolver, vaildateIdentity } from '../util/resolver-utils';

class EthTransactionHandlerController {

    async createATrasaction(request, response, next) {
        const contextResponses = request.body;

        if (Object.keys(contextResponses).length === 0) {
            let err = new Error();
            err.status = StatusCodes.FORBIDDEN;
            err.message = 'request body missing';
            return response.status(StatusCodes.FORBIDDEN).jsonp(err);
        }

        let ethPublicAddress;
        let entityModel;
        let configurations;
        let dltConfigs;
        let contextMappingParams;

        // await this.storeEntityId(contextResponses)
        //     .then((entity) => {
        //         entityModel = entity;
        //         return this.contextBrokerEntityCheck(entity.entityId);
        //     })
        //     .then(() => {
        //         return this.retrieveConfigs(contextResponses);
        //     })
        this.retrieveConfigs(contextResponses)
        .then((configs) => {
                // if config exists
                if (configs.count === 0) {
                    let err = new Error();
                    err.status = StatusCodes.NOT_FOUND;
                    err.message = 'config doesnt exists';
                    return response.status(StatusCodes.NOT_FOUND).jsonp(err);
                }
                // for now supporting only single transaction
                configurations = configs.rows[0];
                return vaildateIdentity(request);
            })
            .then((ethAddress) => {
                ethPublicAddress = ethAddress;
                return dltConfigResolver(configurations);
            })
            .then((dltconfig) => {
                dltConfigs = dltconfig;
                return contextMappingResolver(configurations.contextMapping, contextResponses);
            })
            .then((params) => {
                contextMappingParams = params;
                return ABIValidator(dltConfigs.abi, contextMappingParams);
            })
            .then(() => {
                return this.transactionProcess(dltConfigs, contextMappingParams, ethPublicAddress);
            })
            .then((txRecipt) => {
                if (txRecipt === undefined || txRecipt.length === 0) {
                    let err = new Error();
                    err.message = "smart contract configuration is incorrect";
                    return this.storeErrors(entityModel, err);
                } else {
                    //indivisual recipt mapping to be done in future
                    let recipt = {
                        dltConfig: dltConfigs,
                        contextMapping: configurations.contextMapping,
                        recipt: txRecipt
                    };
                    return this.storeTransactionRecipt(entityModel, recipt);
                }
            })
            .then((json) => {
                // console.log(json.txDetails.recipt);
                if (!proxyRequest) {
                    return response.status(StatusCodes.CREATED).jsonp(json);
                }
            })
            .catch((err) => {
                this.storeErrors(entityModel, err);
                if (!proxyRequest) {
                    return response.status(StatusCodes.FORBIDDEN).jsonp(err);
                }
            })

    }

    async readTransactionData() {

    }

    async retryTransaction() {

    }
}

export default new EthTransactionHandlerController();
