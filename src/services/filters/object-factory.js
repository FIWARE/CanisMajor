import filter from './filter';
import _ from 'lodash';

class ObjectFactory {
  _addPaginationOptions (queryString) {
    return {
      limit: queryString.perPage,
      offset: queryString.perPage * queryString.page
    }
  }

  queryOptions(queryString, sortingArray) {
    var options = {};
    options.pagination = this._addPaginationOptions(queryString);
    options.filters = filter.filterObject(queryString, sortingArray);
    options.sorting = filter.sortingObject(queryString);
    options.relations = filter.addRelationDetails(queryString);
    options.search = filter.addSearchText(queryString);

    return options;
  }
}

export default new ObjectFactory();