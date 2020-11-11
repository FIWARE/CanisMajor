import { getContext } from '../utils/server-utils';
import { DLT_TYPE, HEADER } from '../utils/constant';
import { dlt_type } from '../configuration/config/config.json';
import EthTransactionController from './eth-controller';
import IOTATransactionController from './iota-controller';

class NotificationHandlerController {

  /**
   * Handler of notification sent by the Context Broker
   * @param {Object}   request The request
   * @param {Object}   response The response
   * @param {Object}   next The next
   */
  async notificationHandler(request, response, next) {
    const recvTime = new Date();
    request.canismajor = request.canismajor || {};
    request.canismajor.context = getContext(request);
    const authToken = request.headers[HEADER.X_AUTH_TOKEN];
    const contextResponses = request.body.data;
    console.log(request.body);
    if (contextResponses && Array.isArray(contextResponses)) {
      await this.processNotification(recvTime, authToken, contextResponses, response);
    } else {
      var err = new Error();
      err.status = 403;
      err.message = 'request body missing';
      return response.json(err);
    }
  }

  /**
   * Processes and stores the raw and aggregated data associated to the attribute values received in a
   * notification request
   * @param {Date}     recvTime The time the request was received
   */
  async processNotification(recvTime, authToken, data, response) {
    // An object is needed since Javascript implements calls-by-sharing
    //  (see http://en.wikipedia.org/wiki/Evaluation_strategy#Call_by_sharing) and the counter is shared between
    //  rawAggregatedData() and storeAggregatedData() functions to let them synchronize
    const counterObj = {
      counter: 0
    };

    const contextResponses = data;

    const totalAttributes = contextResponses.length;
    if (totalAttributes === 0) {
      var err = new Error();
      err.status = 403;
      err.message = 'nothing to store on blockchain';
      return response.json(err);
    }

    const contextProcess = contextResponses.map((item) => {
      return this.dltResolver(item, authToken, response);
    });
    const contextProcessData = await Promise.all(contextProcess);
    return response.jsonp(contextProcessData);
  }

  /*
  ** DLT Resolver
  */
  async dltResolver(context, authToken, response) {
    if (dlt_type == DLT_TYPE.ETH) {
      return EthTransactionController.processTransaction(context, authToken);
    } else if (dlt_type === DLT_TYPE.IOTA) {
      return IOTATransactionController.processTransaction(context, authToken);
    } else {
      var err = new Error();
      err.status = 403;
      err.message = 'DLT_Type is missing in config file';
      return response.jsonp(err);
    }

  }
}

export default new NotificationHandlerController();
