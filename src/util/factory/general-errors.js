import _ from 'lodash';

class GeneralErrorServices {
  addErrStatus(err, statusCode) {
    if (!err.status) {
      err.status = statusCode;
    }

    return;
  }

  unprocessableEntity(message) {
    const err = new Error();
    err.status = 422;
    err.message = message;

    throw err;
  }

  unprocessableEntityWrongFields(missingFields, message) {
    const err = new Error();
    err.status = 422;
    err.errors = [];
    _.map(missingFields, (field) => {
      err.errors.push(
        {
          message: message || '',
          path: field
        }
      );
    });

    throw err;
  }

  notFound() {
    const err = new Error();
    err.status = 404;
    err.message = 'not_found';

    throw err;
  }

  forbidden() {
    const err = new Error();
    err.status = 403;

    throw err;
  }

  badRequest(message) {
    const err = new Error();
    err.status = 400;
    if (message) {
      err.message = message;
    }

    throw err;
  }
}

export default new GeneralErrorServices();