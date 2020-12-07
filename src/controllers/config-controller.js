import { BaseCRUDController } from 'base_crud_lib';
import ConfigRepository from '../repositories/config-repository';

class ConfigController extends BaseCRUDController {
  constructor() {
    super();
    this.repository = ConfigRepository;
    this.filters = ['contextType'];
  }
}

export default new ConfigController();
