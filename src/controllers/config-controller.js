import BaseCRUDController from './base-crud-controller';
import ConfigRepository from '../repositories/config-repository';

class ConfigController extends BaseCRUDController {
  constructor() {
    super();
    this.repository = ConfigRepository;
    this.filters = ['contextType'];
  }
}

export default new ConfigController();
