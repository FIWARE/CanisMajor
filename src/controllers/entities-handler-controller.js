import { getContext } from '../utils/server-utils';
import { DLT_TYPE, HEADER } from '../utils/constant';
import EthTransactionController from './eth-controller';
import EntityCRUDController from './entity-crud-controller';
const proxy = require('../utils/HTTPClient.js');


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
      //return IOTATransactionController.processTransaction(context, authToken);
    } else {
      var err = new Error();
      err.status = 403;
      err.message = 'DLT_Type is missing in config file';
      return response.jsonp(err);
    }

  }

  createEntity(request, response, next){
    //store the entityId, payload
    EntityCRUDController.createEntry(request, response, next);

    //Request Forwarded to Context Broker - {/POST} Create Entity
    redirRequest(request, response);

    //Return creation status to user

    return next(err);
  }

  redirRequest(req, res) {
    //redirRequest(req, res, userInfo) {
    // if (userInfo) {
    //   log.info('Access-token OK. Redirecting to app...');
    // } else {
    //   log.info('Public path. Redirecting to app...');
    // }

    //const protocol = config.app.ssl ? 'https' : 'http';
    const protocol = 'http';

    const options = {
      //host: config.app.host, 
      //port: config.app.port,
      //"http://localhost:1026/v2/entities/"      
      host: 'localhost', 
      port: '1026',
      path: '/v2/entities/',
      method: 'POST',
      headers: proxy.getClientIp(req, req.headers),
    };
    proxy.sendData(protocol, options, req.body, res);

  }; 

  // fowardRequestToOrion(request, response){
  //   const request = require("request");

  //   const options = {
  //       method: "POST",
  //       url: "http://localhost:1026/v2/entities/",
  //       body: request.body,
  //       headers: {
  //         'Content-Type': 'application/json'
  //       }
  //   };

  //   request.post(options, (err, res, body) => {
  //       if (err) {
  //           throw new Error(error);
  //       }
  //       console.log(`Status: ${res.statusCode}`);
  //       console.log(body);
  //       return res;
  //   });
  // }


}

export default new EntitiesHandlerController();