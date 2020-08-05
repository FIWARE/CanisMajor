import { getVersion , getName } from '../utils/common-utils';

class VersionHandlerController {

/**
 * Handler for version requests
 * @param {Object}   request The request
 * @param {Object} response  the response
 */
  getVerionHandler(request, response) {
    let message = {};
     message.version = getVersion().version;
     message.name = getName().name;
    return response.jsonp(message);
  }
}

export default new VersionHandlerController();
