import _ from 'lodash';

class FilterObject {
  filterObject(queryStrings, fieldNamesToFilterArray) {
    const filterObject = {};

    if (_.isEmpty(queryStrings)) {
      return filterObject;
    }

    fieldNamesToFilterArray.forEach((value) => {
      if (queryStrings[value]) {
        filterObject[value] = queryStrings[value];
      }
    });

    return filterObject;
  }

  sortingObject(queryString) {
    const sortingOrder = [];
    const sortingString = queryString.sort;

    if (!sortingString) {
      return [['id', 'ASC']];
    }
    const sortingArray = sortingString.split(',');
    for (let i = 0; i < sortingArray.length; i++) {
      let sortType = 'ASC';

      if (_.head(sortingArray[i]) === '-') {
        sortingArray[i] = sortingArray[i].slice(1);
        sortType = 'DESC';
      }

      const object = [];
      object.push(sortingArray[i]);
      object.push(sortType);

      sortingOrder.push(object);
    }

    if (sortingOrder.length === 0) {
      return [['id', 'ASC']];
    }

    return sortingOrder;
  }

  addSearchText(queryString) {
    if (queryString.search) {
      return queryString.search;
    }

    return null;
  }

  addRelationDetails(queryString) {
    if (queryString.relations === 'true') {
      return null;
    }

    return [];
  }
}

export default new FilterObject();
