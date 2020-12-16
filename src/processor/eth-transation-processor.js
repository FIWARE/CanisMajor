import { CONSTANTS, CM_PROXY_APP_HOST, CM_PROXY_APP_PORT, CM_PROXY_HTTPS_ENABLED } from '../configuration/config';
import EthereumService from '../service/eth-service';
import ConfigRepository from '../repository/config-repository';
import EntityRepository from '../repository/entity-repository';
import * as fetch from 'node-fetch';
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
    const proxyRequest = request.path.includes('/transaction') ? false : true;

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

    await this.storeEntityId(contextResponses)
      .then((entity) => {
        entityModel = entity;
        return this.contextBrokerEntityCheck(proxyRequest, entity.entityId);
      })
      .then(() => {
        return this.retrieveConfigs(contextResponses);
      })
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
        return this.vaildateIdentity(request);
      })
      .then((ethAddress) => {
        ethPublicAddress = ethAddress;
        console.log(ethAddress);
        return this.dltConfigResolver(configurations);
      })
      .then((dltconfig) => {
        dltConfigs = dltconfig;
        return this.contextMappingResolver(configurations.contextMapping, contextResponses);
      })
      .then((params) => {
        contextMappingParams = params;
        return this.ABIValidator(dltConfigs.abi, contextMappingParams);
      })
      .then(() => {
        return this.transactionProcess(dltConfigs, contextMappingParams, ethPublicAddress);
      })
      .then((txRecipt) => {
        let recipt = {
          dltConfig: dltConfigs,
          contextMapping: configurations.contextMapping,
          recipt: txRecipt
        };
        return this.storeTransactionRecipt(entityModel, recipt);
      })
      .then((json) => {
        console.log(json.txDetails.recipt);
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

  // future implementation
  async vaildateIdentity(request) {
    // in the current implementation validate only ETH public address
    const ethPublicAddress = request.headers[CONSTANTS.HEADER.X_ETH_PUBLIC_ADDRESS];
    return Promise.resolve(ethPublicAddress);
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

  // check the entity Exist in Context Broker
  async contextBrokerEntityCheck(proxyRequest, entityId) {
    return new Promise((resolve, reject) => {
      // check if the request comming from transaction route (ignored if proxy)
      if (proxyRequest) {
        // support only v2 now ld implementation and resolver to be added
        let protocol = CM_PROXY_HTTPS_ENABLED ? 'https' : 'http';
        let url = `${protocol}://${CM_PROXY_APP_HOST}:${CM_PROXY_APP_PORT}/v2/entities/${entityId}`;
        // fetch the data from the ContextBroker
        fetch(url).then((response) => {
          if (response.status == StatusCodes.OK) {
            resolve(resolve.json());
          }
        }).catch(() => {
          let err = new Error();
          err.status = StatusCodes.NOT_FOUND;
          err.message = 'entity doesnt exists';
          reject(err);
        })
      }
      resolve(entityId);
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

  // future implementation
  async signingTransaction() {
    // to do
  }

  // DLT Type resolver
  dltConfigResolver(data) {
    return new Promise((resolve, reject) => {
      // only ETH clients are supported now
      if (data.dlt_config.dlt_type == CONSTANTS.DLT_TYPE.ETH) {
        delete data.dlt_config["dlt_type"];
        console.log(JSON.stringify(data.dlt_config));
        resolve(data.dlt_config);
      } else {
        reject(null);
      }
    })
  }

  // context mapping with the configuration and payload
  contextMappingResolver(contextMapping, data) {
    return new Promise((resolve, reject) => {
      const obj = [];
      //context mapping from payload to contract method, vars
      contextMapping.forEach((items) => {
        Object.keys(items).forEach((key) => {
          const values = [];
          items[key].forEach((params) => {
            // maps for ID and TYPE from NGSI payload
            if (data.hasOwnProperty(params)) {
              if (params == 'id') {
                values.push(data[params]);
              } else if (params == 'type') {
                values.push(data[params]);
              } else {
                // else values
                values.push(data[params].value);
              }
            }
          });
          obj.push({ method: key, value: values });
        })
      });
      resolve(obj);
    });
  }

  // ABI validate with contextMapping
  async ABIValidator(abi, mapping) {
    return new Promise((resolve, reject) => {
      abi.forEach((element) => {
        // function validation (in future: events, constants, constr)
        if (element.type === "function") {
          mapping.forEach((maps) => {
            // method validation
            if (maps.method != element.name) {
              reject(`Smart Contract ABI doesnt have "${element.name}" method, please fix config`);
            }
            // variable validation
            if (element.inputs.length != maps.value.length) {
              reject(`Smart Contract method "${element.name}" takes ${element.inputs.length} inputs, please fix config`);
            }
            // variable type validation
            // TO DO
          });
        }
      })
      resolve();
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

  // not working (TO BE DONE in future)
  // process the transaction
  async batchTransactionProcess(configs, contextResponses, ethPublicAddress) {
    let promises = [];
    configs.forEach(async data => {
      let promise = new Promise((resolve, reject) => {
        // resolve DLT Configuration
        let dlt_config = this.dltConfigResolver(data);
        // Context Mapping
        let parameters = this.contextMappingResolver(data.contextMapping, contextResponses);
        // initiate transaction
        let ethTransactionController = new EthTransactionController(dlt_config);
        // process transaction
        ethTransactionController.processTransaction(parameters, ethPublicAddress).then((result) => {

          let response = {
            entityId: contextResponses.id,
            dlt_config: dlt_config,
            contextMapping: data.contextMapping,
            response: result
          };

          resolve(response);
        }).catch((error) => {

          let response = {
            entityId: contextResponses.id,
            dlt_config: dlt_config,
            contextMapping: data.contextMapping,
            error: error
          };

          reject(response);
        });
      });
      promises.push(promise);
    });
    // complete all transaction in queue
    return Promise.all(promises);
  }

  // store the transaction recipts
  async storeTransactionRecipt(entity, recipt) {
    return new Promise((resolve, reject) => {
      let newEntity = entity;
      newEntity.txDetails = recipt;
      EntityRepository.update(entity, newEntity).then((result) => {
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
      EntityRepository.update(entity, newEntity).then((result) => {
        console.log(JSON.stringify(result));
      }).catch((err) => {
        console.log(JSON.stringify(err.errors));
      });
    }
  }
}

export default new EthTransactionProcessor();
