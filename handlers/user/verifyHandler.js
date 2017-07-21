"use strict";

var errorCode = require("../../constants/errorCode.js");
var AWS = require("aws-sdk");
// WARNING: Normal amazon-cognito-identity-js should bind webpack, so I choose this library
var CognitoSDK = require("amazon-cognito-identity-js-node");
AWS.config.update({
  region: process.env.COGNITO_REGION
});
AWS.CognitoIdentityServiceProvider.AuthenticationDetails = CognitoSDK.AuthenticationDetails;
AWS.CognitoIdentityServiceProvider.CognitoUserPool = CognitoSDK.CognitoUserPool;
AWS.CognitoIdentityServiceProvider.CognitoUser = CognitoSDK.CognitoUser;
AWS.CognitoIdentityServiceProvider.CognitoUserAttribute = CognitoSDK.CognitoUserAttribute;

// WARNING: "NotAuthorizedException: Unable to verify secret hash for client", SOLUTION: https://github.com/aws/amazon-cognito-identity-js/#configuration
var poolData = { 
  UserPoolId : process.env.COGNITO_USER_POOL_ID,
  ClientId : process.env.COGNITO_CLINET_ID
};
var userPool = new AWS.CognitoIdentityServiceProvider.CognitoUserPool(poolData);

function verify(entity, callback) {
  var userData = {
    "Username" : entity.username,
    "Pool" : userPool
  };

  var cognitoUser = new AWS.CognitoIdentityServiceProvider.CognitoUser(userData);
  //console.log("cognitoUser: ", cognitoUser);
  cognitoUser.confirmRegistration(entity.code, true, function(err, result) {
    if (err) {
      console.log("error", err);
      callback(errorCode.BAD_REQUEST, err);
    } else {
      console.log("result", result);
      let response = {
        "isSuccess": true
      };
      callback(null, response);
    }
  });
}

function parseEvent(event, callback) {
  const body = JSON.parse(event.body);
  if (body.username == undefined || body.code == undefined) {
    callback(errorCode.DATA_REQUIRED.error, errorCode.DATA_REQUIRED.result);
  }
  let entity = {
    "username": body.username,
    "code": body.code
  };
  return entity;
}

module.exports = (event, callback) => {
  console.log("user.verify");
  let entity = parseEvent(event, callback);
  verify(entity, callback);
};
