"use strict";

const Check = require("./handlers/health/checkHandler.js");

function makeResponse(error, result) {
  const statusCode = error && error.statusCode || 200;
  return {
    statusCode,
    headers: {
      "Access-Control-Allow-Origin" : "*"
    },
    body: JSON.stringify(result),
  };
}

module.exports.check = (event, context) => {
  Check(event, (error, result) => {
    const response = makeResponse(error, result);
    context.succeed(response);
  });
};
