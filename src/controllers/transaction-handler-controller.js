import { CONSTANTS, CM_PROXY_APP_HOST, CM_PROXY_APP_PORT, CM_PROXY_HTTPS_ENABLED } from '../configuration/config';
import EthTransactionController from './eth-controller';
import ConfigRepository from '../repositories/config-repository';
import EntityRepository from '../repositories/entity-repository';
import * as fetch from 'node-fetch';

class TransactionHandlerController {
  /**
   * Handler of notification sent by the Context Broker
   * @param {Object}   request The request
   * @param {Object}   response The response
   * @param {Object}   next The next
   */
  async transactionResolve(request, response, next) {

    const authToken = request.headers[CONSTANTS.HEADER.X_ETH_PUBLIC_ADDRESS];
    const contextResponses = Buffer.isBuffer(request.body) ? JSON.parse(request.body.toString()): request.body;

    if (!contextResponses || contextResponses == null) {
      let err = new Error();
      err.status = 403;
      err.message = 'request body missing';
      return response.json(err);
    }

    EntityRepository.create({entityId : contextResponses.id}).then((result) => {
      // returns the entityID if found else catch
      return result.entityId;

      }).then((entityId) => {
        // support only v2 now ld implementation and resolver to be added
        let protocol = CM_PROXY_HTTPS_ENABLED ? 'https' : 'http';
        let url = `${protocol}://${CM_PROXY_APP_HOST}:${CM_PROXY_APP_PORT}/v2/entities/${entityId}`; 
        // fetch the data from the ContextBroker
        return fetch(url);
      }).then((cbResponse) => {
        // entity exist
          if(cbResponse.status === 200) {
            return cbResponse.json();
          } else {
            let err = new Error();
              err.status = 404;
              err.message = 'entity doesnt exist';
            throw err;
          }
      }).then((payload) => {
        // find all config with type
        return  ConfigRepository.fintAllCountAllByContextType(payload.type);
      }).then((result) => {
        // console.log(JSON.stringify(result, 4));
        result.rows.forEach(async data => {
          await this.transactionProcess(data, contextResponses, authToken, response);
        });
      }).catch((err) => {
        console.log(err);
        this.storeErrors(entityId, err);
      })
  }

  async transactionProcess(data, contextResponses, auth, response) {
    let dlt_config = await this.dltConfigResolver(data);
    let parameters = await this.contextMappingResolver(data.contextMapping, contextResponses);
    let ethTransactionController = new EthTransactionController(dlt_config);
    ethTransactionController.processTransaction(parameters, auth).then((result) => {
      return response.jsonp(result);
    }).catch((error) => {
      let err = new Error();
      err.status = 403;
      err.message = error;
      return response.json(err);
    });
  }

  // future implementation
  async vaildateIdentity() {

  }

  // future implementation
  async signingTransaction() {

  }

  // DLT Type resolver
  async dltConfigResolver(data) {
    if (data.dlt_config.dlt_type == CONSTANTS.DLT_TYPE.ETH) {
      delete data.dlt_config["dlt_type"];
      return data.dlt_config;
    } else {
      var err = new Error();
      err.status = 403;
      err.message = `DLT Type should be ${CONSTANTS.DLT_TYPE.ETH}`;
      return response.json(err);
    }
  }

  // context mapping with the configuration and payload
  async contextMappingResolver(contextMapping, data) {
    const obj = [];
    contextMapping.forEach((items) => {
      Object.keys(items).forEach((key) => {
        const values = [];
        items[key].forEach((params) => {
          if (data.hasOwnProperty(params)) {
            values.push(data[params].value);
          }
        });
        obj.push({ method: key, value: values });
      })
    });
    return obj;
  }

  // store the transaction recipts
  async storeTransactionRecipt() {

  }

  // store errors if any
  async storeErrors(entityId, err) {

  }
}

export default new TransactionHandlerController();
