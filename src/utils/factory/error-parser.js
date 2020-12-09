class ErrorParsers {
    sequelizeErrorParser(sequelizeError) {
      const responseError = {};
      if (!sequelizeError.errors) {
        sequelizeError.success = false;
        if (sequelizeError.message) {
          responseError.message = sequelizeError.message;
          responseError.success = false;
          return responseError;
        }
        return sequelizeError;
      }
  
      sequelizeError.errors.forEach((value) => {
        if (value.path === 'passwordNeeded') {
          value.path = 'password';
          value.message = '';
        }
  
        if (value.path === 'lower(username::text)') {
          value.path = 'username';
          value.message = 'value_already_used';
        }
  
        if (value.type === 'notNull Violation') {
          value.message = '';
        }
  
        responseError[value.path] = value.message;
      });
      return responseError;
    }
  
    multerErrorParser(errorObject) {
      const responseError = {
        success: false,
        message: errorObject.code,
        status: 422
      };
  
      if (errorObject.statusCode) {
        responseError.status = errorObject.statusCode;
      }
  
      if (errorObject.code === 'LIMIT_FILE_COUNT') {
        responseError.message = 'too_many_files';
      }
  
      if (errorObject.code === 'LIMIT_FILE_SIZE') {
        responseError.message = 'file_size_exceeded';
      }
  
      return responseError;
    }
  }
  
  export default new ErrorParsers();