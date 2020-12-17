import BaseCRUDController from './base-crud-controller';
import EntityRepository from '../repository/entity-repository';

class EntityCRUDController extends BaseCRUDController {
  constructor() {
    super();
    this.repository = EntityRepository;
    this.filters = ['entityId'];
  }
}

export default new EntityCRUDController();
