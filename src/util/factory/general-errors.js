import _ from 'lodash';

class GeneralErrorServices {
  addErrStatus(err, statusCode) {
    if (!err.status) {
      err.status = statusCode;
    }

    return err;
  }

  unprocessableEntity(message) {
    const err = new Error();
    err.status = 422;
    err.message = message;

    return err;
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

    return err;
  }

  notFound() {
    const err = new Error();
    err.status = 404;
    err.message = 'not_found';

    return err;
  }

  forbidden() {
    const err = new Error();
    err.status = 403;

    return err;
  }

  badRequest(message) {
    const err = new Error();
    err.status = 400;
    if (message) {
      err.message = message;
    }

    return err;
  }
}

export default new GeneralErrorServices();