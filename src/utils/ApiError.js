class ApiError extends Error {
    constructor(statusCode, message, isOperational = true, stack = '') {
      super(message);
      this.statusCode = statusCode;
      this.isOperational = isOperational;
      this.errorMsg=message;

    }
  }
  
  module.exports = ApiError;
  