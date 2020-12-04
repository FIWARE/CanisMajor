import BaseCRUDController from './base-crud-controller';
import EntityRepository from '../repositories/entity-repository.js';

class EntityCRUDController extends BaseCRUDController {
  constructor() {
    super();
    this.repository = EntityRepository;
    this.filters = ['entityId'];
  }
}

export default new EntityCRUDController();
