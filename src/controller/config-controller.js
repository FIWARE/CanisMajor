import BaseCRUDController from './base-crud-controller';
import ConfigRepository from '../repository/config-repository';
import { StatusCodes } from 'http-status-codes';
import generalErrors from '../util/factory/general-errors';

class ConfigController extends BaseCRUDController {
  constructor() {
    super();
    this.repository = ConfigRepository;
    this.filters = ['contextType'];
  }

  createConfig(request, response, next) {
    const contextType = request.body.contextType;
    const contextMapping  = request.body.contextMapping;
    let exist = false;
    // context type exist or not
    if(contextType == null || contextType == '') {
      response.status(StatusCodes.BAD_REQUEST).jsonp({'message': 'contextType is missing'});
    }

    //context mapping validation if exist or not
    if(contextMapping == null || contextMapping == '' || !Array.isArray(contextMapping) || Array.isArray(contextMapping).length == 0) {
      response.status(StatusCodes.BAD_REQUEST).jsonp({'message': 'contextMapping is missing or not correct'});
    }


    ConfigRepository.findAllCountAllByContextType(contextType)
    .then((configs) => {
      // if empty create
      if(configs.count === 0 ) {
        exist = true;
        this.createEntry(request, response, next);
      }
      // check if config exists
      configs.rows.forEach(element => {
        // if context mapping exist check
        if(JSON.stringify(element.contextMapping) === JSON.stringify(contextMapping)) {
          exist = true;
          return response.status(StatusCodes.BAD_REQUEST).jsonp(generalErrors.badRequest('config already exist'));
        }
      });
    }).then(() => {
      if(!exist) {
        return this.createEntry(request, response, next);
      }
    })
  }

  updateConfig(request, response, next) {
    const contextType = request.body.contextType;
    const contextMapping  = request.body.contextMapping;
    // context type exist or not
    if(contextType == null || contextType == '') {
      return response.status(StatusCodes.BAD_REQUEST).jsonp({'message': 'contextType is missing'});
    }

    //context mapping validation if exist or not
    if(contextMapping == null || contextMapping == '' || !Array.isArray(contextMapping) || Array.isArray(contextMapping).length == 0) {
      return response.status(StatusCodes.BAD_REQUEST).jsonp({'message': 'contextMapping is missing or not correct'});
    }
    return this.updateEntry(request, response, next);
  }
}

export default new ConfigController();
