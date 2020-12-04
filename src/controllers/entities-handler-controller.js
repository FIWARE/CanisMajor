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
    //EntityCRUDController.createEntry(request, response, next);

    //Request Forwarded to Context Broker - {/POST} Create Entity
    const protocol = 'http';

    const options = {
      //host: config.app.host, 
      //port: config.app.port,
      //"http://localhost:1026/v2/entities/"      
      host: 'localhost', 
      port: '4000',
      path: '/version',
      method: 'GET',
      //headers: proxy.getClientIp(request, request.headers),
    };

    console.log(request.body);
    
    proxy.sendData(protocol, options, request.body, response);
    return response;

  }


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