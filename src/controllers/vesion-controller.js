import { getVersion , getName } from '../utils/common-utils';

class VersionHandlerController {

/**
 * Handler for version requests
 * @param {Object}   request The request
 * @param {Object} response  the response
 */
  getVerionHandler(request, response) {
    let message = {};
    message.name = getName().name;
    message.version = getVersion().version;
    return response.jsonp(message);
  }

  //Returns the List of API's available in CanisMajor
  getAPI(request, response) {
    let message = {};
    message.name = 'implementation pending';
    message.version = 'implementation pending';
    return response.jsonp(message);
  }


  getHealthStatus(request, response) {
    let message = {};
    message.name = 'implementation pending';
    message.version = 'implementation pending';
    return response.jsonp(message);
  }
}

export default new VersionHandlerController();
