var db = require("../models/index");
import BaseCRUDRepository from './base-crud-repository';

class ConfigRepository extends BaseCRUDRepository {
  constructor() {
    super();
    this.model = db.configs;
    this.createFields = ['data'];
    this.updateFields = ['data'];
  }
}

export default new ConfigRepository();