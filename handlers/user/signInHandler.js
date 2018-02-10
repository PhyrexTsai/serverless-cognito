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

function signIn(entity, callback) {
  var authenticationData = {
    Username : entity.username, // your username here
    Password : entity.password, // your password here
  };

  var userData = {
    "Username" : entity.username,
    "Pool" : userPool
  };
  var authenticationDetails = new AWS.CognitoIdentityServiceProvider.AuthenticationDetails(authenticationData);
 
  var cognitoUser = new AWS.CognitoIdentityServiceProvider.CognitoUser(userData);
  cognitoUser.authenticateUser(authenticationDetails, {
    onSuccess: function (result) {
      let response = {
        "idTokne": result.getIdToken().getJwtToken(),
        "accessToken": result.getAccessToken().getJwtToken(),
        "refreshToken": result.getRefreshToken().getJwtToken()
      };
      callback(null, response);
    },

    onFailure: function(err) {
      console.log("err", err);
      callback(errorCode.BAD_REQUEST, err);
    },
    mfaRequired: function(codeDeliveryDetails) {
      //var verificationCode = prompt("Please input verification code" ,"");
      //cognitoUser.sendMFACode(verificationCode, this);
      console.log("codeDeliveryDetails", codeDeliveryDetails);
      callback(errorCode.BAD_REQUEST, codeDeliveryDetails);
    }
  });
}

function parseEvent(event, callback) {
  const body = JSON.parse(event.body);
  if (body.username == undefined || body.password == undefined) {
    callback(errorCode.DATA_REQUIRED.error, errorCode.DATA_REQUIRED.result);
  }
  let entity = {
    "username": body.username,
    "password": body.password
  };
  return entity;
}

module.exports = (event, callback) => {
  console.log("user.signIn");
  let entity = parseEvent(event, callback);
  signIn(entity, callback);
};
