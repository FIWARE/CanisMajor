import { CONSTANTS } from '../configuration/config';
import EthTransactionController from './eth-controller';
import ConfigRepository from '../repositories/config-repository';
import EntityRepository from '../repositories/entity-repository';

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
    console.log(authToken);
    console.log(JSON.stringify(contextResponses));
    if (!contextResponses || contextResponses == null) {
      let err = new Error();
      err.status = 403;
      err.message = 'request body missing';
      return response.json(err);
    }


    EntityRepository.create({entityId : contextResponses.id}).then((result) => {
      return result;
    }).then(() => {
      // find all config with type
      return  ConfigRepository.fintAllCountAllByContextType(contextResponses.type);
    }).then((result) => {
      // console.log(JSON.stringify(result, 4));
      result.rows.forEach(async data => {
        await this.transactionProcess(data, contextResponses, authToken, response);
      });
    }).catch((err) => {
      // update the entity in error
      // EntityRepository.
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

  async confirmRequestStatusCB() {

  }

  async vaildateIdentity() {

  }

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

  async storeTransactionRecipt() {

  }
}

export default new TransactionHandlerController();
