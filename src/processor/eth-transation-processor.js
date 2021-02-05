import { ABIValidator, contextMappingResolver, vaildateIdentity, contextBrokerEntityCheck } from '../util/resolver-utils';
import EthereumService from '../service/eth-service';
import ConfigRepository from '../repository/config-repository';
import EntityRepository from '../repository/entity-repository';
import { StatusCodes } from 'http-status-codes';

class EthTransactionProcessor {
  /**
   * Handler of notification sent by the Context Broker
   * @param {Object}   request The request
   * @param {Object}   response The response
   * @param {Object}   next The next
   */
  async transactionResolve(request, response, next) {

    const contextResponses = Buffer.isBuffer(request.body) ? JSON.parse(request.body.toString()) : request.body;
    // const debugMode = (request.query.debug) ? request.query.debug : false;
    const debugMode = true;
    if (Object.keys(contextResponses).length === 0) {
      let err = new Error();
      err.status = StatusCodes.FORBIDDEN;
      err.message = 'request body missing';
      return response.status(StatusCodes.FORBIDDEN).jsonp(err);
    }

    let ethPublicAddress;
    let ethPrivateKey;
    let entityModel;
    let configurations;
    let contextMappingParams;
    await this.storeEntityId(contextResponses)
      .then((entity) => {
        entityModel = entity;
        if (debugMode) {
          return entityModel;
        } 
        return contextBrokerEntityCheck(entity.entityId);
      })
      .then(() => {
        return this.retrieveConfigs(contextResponses);
      })
      this.retrieveConfigs(contextResponses).then((configs) => {
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
      .then((data) => {
        console.log(data);
        ethPublicAddress = data.address;
        ethPrivateKey = data.privateKey;
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
        if (debugMode) {
          return response.status(StatusCodes.CREATED).jsonp(json);
        }
      })
      .catch((err) => {
        console.log(err);
        this.storeErrors(entityModel, err);
        if (debugMode) {
          return response.status(StatusCodes.FORBIDDEN).jsonp(err);
        }
      })
  }

  // store entityId in a DB
  async storeEntityId(contextResponses) {
    return new Promise((resolve, reject) => {
      EntityRepository.create({ entityId: contextResponses.id }).then((result) => {
        resolve(result);
      }).catch((err) => {
        reject(err.errors);
      });
    });
  }

  async retrieveConfigs(contextResponses) {
    return new Promise((resolve, reject) => {
      ConfigRepository.findAllCountAllByContextType(contextResponses.type).then((result) => {
        resolve(result);
      }).catch((err) => {
        reject(err.errors);
      });
    });
  }

  // process the transaction
  async transactionProcess(dlt_config, contextMappingParams, ethPublicAddress) {
    return new Promise((resolve, reject) => {
      // initiate transaction
      let ethService = new EthereumService(dlt_config);
      // process transaction
      ethService.processTransaction(contextMappingParams, ethPublicAddress).then((result) => {
        resolve(result);
      }).catch((error) => {
        reject(error);
      });
    });
  }

  // store the transaction recipts
  async storeTransactionRecipt(entity, recipt) {
    return new Promise((resolve, reject) => {
      let newEntity = entity;
      newEntity.txDetails = recipt;
      EntityRepository.update(entity.id, entity, newEntity).then((result) => {
        resolve(result);
      }).catch((err) => {
        reject(err.errors);
      });
    });
  }

  // store errors if any
  async storeErrors(entity, error) {
    if (typeof entity != 'undefined') {
      let newEntity = entity;
      newEntity.txDetails = error;
      EntityRepository.update(entity.id, entity, newEntity).then((result) => {
        console.log(JSON.stringify(result));
      }).catch((err) => {
        console.log(JSON.stringify(err.errors));
      });
    }
  }


  // not working (TO BE DONE in future)
  // process the transaction
  // async batchTransactionProcess(configs, contextResponses, ethPublicAddress) {
  //   let promises = [];
  //   configs.forEach(async data => {
  //     let promise = new Promise((resolve, reject) => {
  //       // resolve DLT Configuration
  //       let dlt_config = this.dltConfigResolver(data);
  //       // Context Mapping
  //       let parameters = this.contextMappingResolver(data.contextMapping, contextResponses);
  //       // initiate transaction
  //       let ethTransactionController = new EthTransactionController(dlt_config);
  //       // process transaction
  //       ethTransactionController.processTransaction(parameters, ethPublicAddress).then((result) => {

  //         let response = {
  //           entityId: contextResponses.id,
  //           dlt_config: dlt_config,
  //           contextMapping: data.contextMapping,
  //           response: result
  //         };

  //         resolve(response);
  //       }).catch((error) => {

  //         let response = {
  //           entityId: contextResponses.id,
  //           dlt_config: dlt_config,
  //           contextMapping: data.contextMapping,
  //           error: error
  //         };

  //         reject(response);
  //       });
  //     });
  //     promises.push(promise);
  //   });
  //   // complete all transaction in queue
  //   return Promise.all(promises);
  // }
}

export default new EthTransactionProcessor();
