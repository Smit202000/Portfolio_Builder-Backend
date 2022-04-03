const { JsonWebTokenError } = require('jsonwebtoken');
const MyErrors = require('../utils/customError.js');
const mongoose = require('mongoose');
const { MongoServerError } = require('mongodb');

const errorHandler = (error, req, res, next) => {
  console.error('error', error);
  if (error instanceof MyErrors) {
    return res.status(error.statusCode).json({
      success: false,
      message: error.errMsg,
    });
  } else if (error instanceof JsonWebTokenError) {
    return res.status(401).json({
      success: false,
      message: error.message,
    });
  } else if (
    error instanceof mongoose.Error.ValidationError ||
    error instanceof MongoServerError
  ) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  } else {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = { errorHandler };
