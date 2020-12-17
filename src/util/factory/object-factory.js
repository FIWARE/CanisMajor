import _ from 'lodash';
import filter from './filters';

class ObjectFactory {
  addPaginationOptions(queryString) {
    return {
      limit: queryString.limit,
      offset: queryString.limit * queryString.offset
    };
  }

  queryOptions(queryString, sortingArray) {
    const options = {};
    options.pagination = this.addPaginationOptions(queryString);
    options.filters = filter.filterObject(queryString, sortingArray);
    options.sorting = filter.sortingObject(queryString);
    options.relations = filter.addRelationDetails(queryString);
    options.search = filter.addSearchText(queryString);

    return options;
  }
}

export default new ObjectFactory();
