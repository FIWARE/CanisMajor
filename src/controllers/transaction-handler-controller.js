import { HEADER, DLT_TYPE } from '../utils/constant';
import EthTransactionController from './eth-controller';
import ConfigRepository from '../repositories/config-repository';

class TransactionHandlerController {
  /**
   * Handler of notification sent by the Context Broker
   * @param {Object}   request The request
   * @param {Object}   response The response
   * @param {Object}   next The next
   */
  async transactionResolve(request, response, next ) {
    const authToken = request.headers[HEADER.X_ETH_PUBLIC_ADDRESS];
    const contextResponses = request.body;
    if (!contextResponses || contextResponses == null) {
      let err = new Error();
      err.status = 403;
      err.message = 'request body missing';
      return response.json(err);
    }
    // find all config with type
    ConfigRepository.fintAllCountAllByContextType(contextResponses.type).then((result) => {
      // console.log(JSON.stringify(result, 4));
      result.rows.forEach(async data => {
        await this.transactionProcess(data, contextResponses, authToken, response);
      });
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

  storeEntity() {

  }

  async confirmRequestStatusCB() {

  }

  async vaildateIdentity() {

  }

  async dltConfigResolver(data) {
    if (data.dlt_config.dlt_type == DLT_TYPE.ETH) {
      delete data.dlt_config["dlt_type"];
      return data.dlt_config;
    } else {
      var err = new Error();
      err.status = 403;
      err.message = `DLT Type should be ${DLT_TYPE.ETH}`;
      return response.json(err);
    }
  }

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
        obj.push({method: key, value: values});
      })
    });
    return obj;
  }

  async storeTransactionRecipt() {

  }
}

export default new TransactionHandlerController();
