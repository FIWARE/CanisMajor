import { getContext } from '../utils/server-utils';
import { DLT_TYPE, HEADER } from '../utils/constant';
import EthTransactionController from './eth-controller';
//import IOTATransactionController from './iota-controller';

class TypesHandlerController{

	/**
	 * Given an entity type, delete all the historical
	 * records of all entities of such type.
	 * @param {Object}   request The request
	 * @param {Object}   response The response
	 * @param {Object}   next The next
	 */
	deleteTypeHandler(request, response, next) {
	  return response.json("{}");
	}

	async testTypeHandler(request, response, next) {
	  return response.json("{}");
	}

	/*
	** DLT Resolver
	*/
	async dltResolver(context, authToken, response) {
	  if (dlt_type == DLT_TYPE.ETH) {
	    return EthTransactionController.processTransaction(context, authToken);
	  } else if (dlt_type === DLT_TYPE.IOTA) {
	    //return IOTATransactionController.processTransaction(context, authToken);
	  } else {
	    var err = new Error();
	    err.status = 403;
	    err.message = 'DLT_Type is missing in config file';
	    return response.jsonp(err);
	  }

	}
}

export default new TypesHandlerController();
