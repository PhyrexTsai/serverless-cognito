"use strict";

function check(callback) {
  var result = {
    "status": "OK"
  };
  callback(null, result);
}

module.exports = (event, callback) => {
  check(callback);
};
