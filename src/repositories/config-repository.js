var db = require("../models/index");
import BaseCRUDRepository from './base-crud-repository';

class ConfigRepository extends BaseCRUDRepository {
  constructor() {
    super();
    this.model = db.configs;
    this.createFields = ['contextType', 'dlt_config', 'contextMapping', 'meta'];
    this.updateFields = ['contextType', 'dlt_config', 'contextMapping', 'meta'];
  }

  fintAllCountAllByContextType(contextType) {
    return db.configs.findAndCountAll({
      where:{
        contextType: contextType,
      },
      order: [['createdAt', 'DESC']],
      // offset: options.pagination.offset,
      // limit: options.pagination.limit
    });
  }
}

export default new ConfigRepository();