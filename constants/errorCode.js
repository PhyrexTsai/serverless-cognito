"use strict";

/**
 * Defind ERROR CODE 
 */

exports.INTERNAL_SERVER_ERROR = {
  "error": {
    "statusCode": 500
  },
  "result": {
    "message": "Internal server error"
  }
};

exports.DATA_REQUIRED = {
  "error": {
    "statusCode": 400
  },
  "result": {
    "message": "Data required"
  }
};

exports.BAD_REQUEST = {
  "statusCode": 400
};
