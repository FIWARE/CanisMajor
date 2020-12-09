var db = require("../models/index");
import { BaseCRUDRepository } from 'base_crud_lib';

class EntitiesRepository extends BaseCRUDRepository {
  constructor() {
    super();
    this.model = db.entities;
    this.createFields = ['entityId', 'txDetails'];
    this.updateFields = ['entityId', 'txDetails'];
  }
}

export default new EntitiesRepository();