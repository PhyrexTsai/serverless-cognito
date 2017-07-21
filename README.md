# Serverless Cognito
Using serverless framework on AWS Lambda and combine AWS Cognito.

## AWS Services
- API Gateway
- Lambda
- Cognito
- SMS

## Configure Serverless 

```
export COGNITO_REGION=
export COGNITO_USER_POOL_ID=
export COGNITO_CLINET_ID=
export COGNITO_ARN=
```

## Usage

### Install
Please use serverless version 1.5 or more.
```
npm install serverless -g
```
or
```
npm upgrade serverless -g
```

### Deploy
```
serverless deploy 
```

### Remove 
```
serverless remove
```

### Test
```
serverless offline start
```

## APIs

| Method | HTTP Method | Path |
|:-------|:-----------:|:-----|
| Register | POST | /v1/user/signUp |
| Login | POST | /v1/user/signIp |
| Logout | POST | /v1/user/signOut |
| Verify | POST | /v1/user/verify |
| Resend SMS | POST | /v1/user/resendSMS |
| Forgot Password | POST | /v1/user/forgotPassword |
| Reset Password | POST | /v1/user/resetPassword |
| Health | GET | /v1/user/health |
