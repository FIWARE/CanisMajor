import generalErrors from './errors/general-errors';

import _ from 'lodash';

class GeneralFactories {
  changeIfHasProperty (firstObject, newObject, property) {
    if (newObject.hasOwnProperty(property)) {
      return newObject[property];
    }

    return firstObject[property];
  }

  /**
   * verify if an object has specified fields
   * @param  {Object} object object to verify
   * @param  {Array} fields needed fields
   * @throws {error} throws error for missing fields
   */
  verifyObjectHasFields(object, fields) {
    var missingFields = [];
    _.map(fields, field => {
      if(!object.hasOwnProperty(field)) {
        missingFields.push(field);
      }
    });

    if (missingFields.length >= 1) {
      generalErrors.unprocessableEntityWrongFields(missingFields, null);
    }
  }

  assignArrayToProperty(propertyName, response) {
    return {
      [propertyName]: response
    };
  }

  deletePropertiesFromObject(object, properties) {
    _.map(properties, property => {
      if(object.hasOwnProperty(property)) {
        delete object[property];
      }
    });
  }

  deletePropertiesFromSequelizeResponseObject (object, propertiesArray) {
    _.map(propertiesArray, property => {
      if(object.dataValues && object.dataValues.hasOwnProperty(property)) {
        delete object.dataValues[property];
      }
    });
  }
}

export default new GeneralFactories();