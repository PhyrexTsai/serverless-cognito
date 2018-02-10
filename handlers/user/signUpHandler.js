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

function createUser(entity, callback) {
  let response = {
    "username": cognitoUser.username,
    "isSuccess": true
  };
  callback(null, response);
}

function signUp(entity, callback) {
  var attributeList = [];
  // WARNING: entity should pass by constructor, not origin way
  var attributeName = new AWS.CognitoIdentityServiceProvider.CognitoUserAttribute("name", entity.username);
  var attributeEmail = new AWS.CognitoIdentityServiceProvider.CognitoUserAttribute("email", entity.email);
  //var attributePhoneNumber = new AWS.CognitoIdentityServiceProvider.CognitoUserAttribute("phone_number", entity.phone_number);

  attributeList.push(attributeName);
  attributeList.push(attributeEmail);
  //attributeList.push(attributePhoneNumber);

  userPool.signUp(entity.username, entity.password, attributeList, null, function(err, result){
    if (err) {
      console.log("error", err);
      callback(errorCode.BAD_REQUEST, err);
    } else {
      var cognitoUser = result.user;
      createUser(entity, callback);
    }
  });
}

function parseEvent(event, callback) {
  const body = JSON.parse(event.body);
  if (body.email == undefined) {
    callback(errorCode.DATA_REQUIRED.error, errorCode.DATA_REQUIRED.result);
  }
  let entity = {
    "username": body.username,
    "password": body.password,
    "email": body.email
  };
  return entity;
}

module.exports = (event, callback) => {
  console.log("user.signUp");
  let entity = parseEvent(event, callback);
  signUp(entity, callback);
};
