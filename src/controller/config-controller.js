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
    // context type exist or not
    if(contextType == null || contextType == '') {
      response.status(StatusCodes.BAD_REQUEST).jsonp({'message': 'contextType is missing'});
    }

    //context mapping validation if exist or not
    if(contextMapping == null || contextMapping == '' || Array.isArray(contextMapping)) {
      response.status(StatusCodes.BAD_REQUEST).jsonp({'message': 'contextMapping is missing or not correct'});
    }

    ConfigRepository.findAllCountAllByContextType(contextType)
    .then((configs) => {
      // if empty create
      if(configs.count === 0 ) {
        return this.createEntry(request, response, next);
      }
      return response.status(StatusCodes.UNPROCESSABLE_ENTITY).jsonp(generalErrors.badRequest('config already exist'));
    }).catch((err) => {
      response.status(StatusCodes.UNPROCESSABLE_ENTITY).jsonp(generalErrors.addErrStatus(err, StatusCodes.UNPROCESSABLE_ENTITY));
    });
  }

  updateConfig(request, response, next) {
    const contextType = request.body.contextType;
    const contextMapping  = request.body.contextMapping;
    // context type exist or not
    if(contextType == null || contextType == '') {
      return response.status(StatusCodes.BAD_REQUEST).jsonp({'message': 'contextType is missing'});
    }
    //context mapping validation if exist or not
    if(contextMapping == null || contextMapping == '' || Array.isArray(contextMapping)) {
      return response.status(StatusCodes.BAD_REQUEST).jsonp({'message': 'contextMapping is missing or not correct'});
    }
    return this.updateEntry(request, response, next);
  }
}

export default new ConfigController();
