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

  findOneByIdAndAttributes (id, attributes, options) {
    return this.model.findAndCountAll({
      where: {
        id: id,
        attrName: attributes
      },
      order: options.sorting,
      offset: options.pagination.offset,
      limit: options.pagination.limit
    });
  }


  findAllByAttributes (attributes, options) {
    return this.model.findAndCountAll({
      where: {
        attrName: attributes
      },
      order: options.sorting,
      offset: options.pagination.offset,
      limit: options.pagination.limit
    });
  }


  findAllByTypeAndAttributes (type, attributes, options) {
    return this.model.findAndCountAll({
      where: {
        entityType: type,
        attrName: attributes
      },
      order: options.sorting,
      offset: options.pagination.offset,
      limit: options.pagination.limit
    });
  }

  findAllByType (type, options) {
    return this.model.findAndCountAll({
      where: {
        type: type
      },
      order: options.sorting,
      offset: options.pagination.offset,
      limit: options.pagination.limit
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