import BaseCRUDController from './base-crud-controller';
import ConfigRepository from '../repository/config-repository';
import { StatusCodes } from 'http-status-codes';

class ConfigController extends BaseCRUDController {
  constructor() {
    super();
    this.repository = ConfigRepository;
    this.filters = ['contextType'];
  }

  createConfig(request, response, next) {
    const contextType = request.body.contextType;
    const contextMapping  = request.body.contextMapping;
    return configRepository.findAllCountAllByContextType(contextType)
    .then((configs) => {
      // if empty create
      if(configs.count === 0 ) {
        this.createEntry(request, response, next);
      }

      configs.rows.forEach(element => {
        // if context mapping exist check
        if(JSON.stringify(element.contextMapping) === JSON.stringify(contextMapping)) {
          let err = new Error();
          err.status = StatusCodes.BAD_REQUEST;
          err.message = 'Context Mapping Already Exists'
          return response.status(StatusCodes.BAD_REQUEST).jsonp(err);
        }
        this.createEntry(request, response, next);
      });
    })
  }
}

export default new ConfigController();
