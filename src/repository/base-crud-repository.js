import generalFactories from '../util/factory/general-factory';

export default class BaseCRUDRepository {
  constructor() {
    this.model = null;
  }

  findOneById (id) {
    return this.model.findOne({
      where: {
        id: id
      }
    });
  }

  findAndCountAllByFilter (options) {
    return this.model.findAndCountAll({
      where: options.filters,
      order: options.sorting,
      offset: options.pagination.offset,
      limit: options.pagination.limit
    });
  }

  create (entry) {
    const  createObject = {};
    for (const key of this.createFields) {
      createObject[key] = entry[key];
    }
    console.log(entry);
    console.log(createObject);

    return this.model.create(createObject);
  }

  update(id, entry, updateEntry) {
    const updateObject = {};
    for (const key of this.updateFields) {
      updateObject[key] = generalFactories
        .changeIfHasProperty(entry, updateEntry, key);
    }
    return entry.update(updateEntry);
  }
}