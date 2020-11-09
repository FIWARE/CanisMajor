import { getContext } from '../utils/server-utils';
import { DLT_TYPE, HEADER } from '../utils/constant';
import { dlt_type } from '../configuration/config/config.json';
import EthTransactionController from './eth-controller';
import IOTATransactionController from './iota-controller';

class EntitiesHandlerController{
  /**
  * Given an entity (with type and id), delete all its historical records.
  * @param {Object}   request The request
  * @param {Object}   response The response
  * @param {Object}   next The next
  **/
  deleteEntityHandler(request, response, next) {
    return response.json("Under development ");
  }

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

export default new EntitiesHandlerController();