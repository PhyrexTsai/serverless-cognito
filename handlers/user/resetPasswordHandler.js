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

var poolData = { 
  UserPoolId : process.env.COGNITO_USER_POOL_ID,
  ClientId : process.env.COGNITO_CLINET_ID
};
var userPool = new AWS.CognitoIdentityServiceProvider.CognitoUserPool(poolData);

function resetPassword(entity, callback) {
  var userData = {
    "Username" : entity.username,
    "Pool" : userPool
  };

  var cognitoUser = new AWS.CognitoIdentityServiceProvider.CognitoUser(userData);
  cognitoUser.confirmPassword(entity.verificationCode, entity.password, {
    onSuccess: function () {
      let response = {
        "isSuccess": true
      };
      callback(null, response);
    },
    onFailure: function(err) {
      console.log("err", err);
      callback(errorCode.BAD_REQUEST, err);
    }
  });
}

function parseEvent(event, callback) {
  const body = JSON.parse(event.body);
  if (body.username == undefined) {
    callback(errorCode.DATA_REQUIRED.error, errorCode.DATA_REQUIRED.result);
  }
  let entity = {
    "username": body.username,
    "password": body.password,
    "verificationCode": body.verificationCode
  };
  return entity;
}

module.exports = (event, callback) => {
  console.log("user.resetPassword");
  let entity = parseEvent(event, callback);
  resetPassword(entity, callback);
};
