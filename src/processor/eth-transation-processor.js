import { contextBrokerEntityCheck } from '../util/resolver-utils';
import { StatusCodes } from 'http-status-codes';
import EthTransactionHandlerController from '../controller/eth-transaction-controller';

class EthTransactionProcessor {
  /**
   * Handler of notification sent by the Context Broker
   * @param {Object}   request The request
   * @param {Object}   response The response
   * @param {Object}   next The next
   */
  async transactionResolve(request, response, next) {
    contextBrokerEntityCheck(entity.entityId)
      .then(() => {
        return EthTransactionHandlerController.createATrasaction(request, response, next);
      })    
      .catch((err) => {
        console.log(err);
        if (debugMode) {
          return response.status(StatusCodes.FORBIDDEN).jsonp(err);
        }
    });
  }
}

export default new EthTransactionProcessor();
