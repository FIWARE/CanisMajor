import _ from 'lodash';

class FilterObject {
    // first parameter is for req.query and second for the fields that you need to create on the filterObject.
    filterObject(queryStrings, fieldNamesToFilterArray) {
    var filterObject = {};

    if (_.isEmpty(queryStrings)) {
      return filterObject;
    }

    fieldNamesToFilterArray.forEach(function(value) {
      if (queryStrings[value]) {
        filterObject[value] = queryStrings[value];
      }
    })

    return filterObject;
  }

  sortingObject(queryString) {
    var sortingOrder = [];
    var sortingString = queryString.sort;

    // if no sorting query params are defined, default:  id, ASC
    if (!sortingString) {
      return [['id', 'ASC']];
    }
    var sortingArray = sortingString.split(",");
    for (let i=0; i < sortingArray.length; i++) {
      let sortType = "ASC";

      if (_.head(sortingArray[i]) === "-") {
        sortingArray[i] = sortingArray[i].slice(1);
        sortType = "DESC"
      }

      var object = [];
      object.push(sortingArray[i]);
      object.push(sortType);

      sortingOrder.push(object);
    }

    if (sortingOrder.length == 0) {
      return [['id', 'ASC']];
    }

    return sortingOrder;
  }

  addSearchText(queryString) {
    if (queryString.search) {
      return queryString.search
    }

    return null;
  }

  addRelationDetails(queryString) {
    if (queryString.relations == 'true') {
      return null;
    }

    return [];
  }
}

export default new FilterObject();