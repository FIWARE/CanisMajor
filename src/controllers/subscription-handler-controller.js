import { getContext } from '../utils/server-utils';
import { DLT_TYPE, HEADER } from '../utils/constant';
import { dlt_type } from '../configuration/config/config.json';
import EthTransactionController from './eth-controller';
import IOTATransactionController from './iota-controller';

class SubscriptionHandlerController{

	/**
	 * Handler of creation of the subscription in Orion Context Broker
	 * that will generate the notifications to be consumed
	 * by CanisMajor in order to persist the data in a DLTs
	 * @param {Object}   request The request
	 * @param {Object}   response The response
	 * @param {Object}   next The next
	 */
	subscriptionHandler(request, response, next) {

	  return response.json("Under development ");
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

export default new SubscriptionHandlerController();
