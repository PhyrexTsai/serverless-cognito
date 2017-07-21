"use strict";

const SignUp = require("./handlers/user/signUpHandler.js");
const SignIn = require("./handlers/user/signInHandler.js");
const SignOut = require("./handlers/user/signOutHandler.js");
const Verify = require("./handlers/user/verifyHandler.js");
const ResendSMS = require("./handlers/user/resendSMSHandler.js");
const ForgotPassword = require("./handlers/user/forgotPasswordHandler.js");
const ResetPassword = require("./handlers/user/resetPasswordHandler.js");

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

module.exports.signUp = (event, context) => {
  SignUp(event, (error, result) => {
    const response = makeResponse(error, result);
    context.succeed(response);
  });
};

module.exports.signIn = (event, context) => {
  SignIn(event, (error, result) => {
    const response = makeResponse(error, result);
    context.succeed(response);
  });
};

module.exports.signOut = (event, context) => {
  SignOut(event, (error, result) => {
    const response = makeResponse(error, result);
    context.succeed(response);
  });
};

module.exports.verify = (event, context) => {
  Verify(event, (error, result) => {
    const response = makeResponse(error, result);
    context.succeed(response);
  });
};

module.exports.resendSMS = (event, context) => {
  ResendSMS(event, (error, result) => {
    const response = makeResponse(error, result);
    context.succeed(response);
  });
};

module.exports.forgotPassword = (event, context) => {
  ForgotPassword(event, (error, result) => {
    const response = makeResponse(error, result);
    context.succeed(response);
  });
};

module.exports.resetPassword = (event, context) => {
  ResetPassword(event, (error, result) => {
    const response = makeResponse(error, result);
    context.succeed(response);
  });
};
