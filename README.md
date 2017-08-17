# aws-cognito-graphcool
Integration of AWS Cognito with Graphcool.

> Note: Under development, use as a starting point...

## Authentication flow in app (tested with Facebook)
1. The user clicks the 'Login with Facebook' button
2. The Facebook UI is loaded and the user logs in and accepts
3. The app receives a Facebook Access Token
4. The Facebook token is then passed to AWS Cognito
5. Cognito returns the security credentials upon verifying the identity
6. Using security credentials, the app calls the API with Facebook token to authenticate it with Graphcool
7. The lamba executes the mutation `authenticateFacebookUser(facebookToken: String!)`
8. If no user exists yet that corresponds to the passed `facebookToken`, a new `User` node will be created
9. In any case, the `authenticateFacebookUser(facebookToken: String!)` mutation returns a valid token for the user
10. The app can use the token to call Graphcool API.

## Facebook App Setup
Facebook setup is clone of [facebook-authentication](https://github.com/graphcool-examples/functions/blob/master/authentication/facebook-authentication/README.md). Follow the guidelines to set up the app.

## AWS Setup
Download the AWS SDK for Javascript and place it in your root directory.
### Lambda Function
1. Create a Lambda Function
2. Select Author from scratch
3. Skip adding triggers
4. Name the lambda function, use `Node.js 6.10` as Runtime
5. Create an Environment varible `GRAPHCOOL_API` with your own API
6. Assign a Role with `AWSLambdaBasicExecutionRole` policy attached to it
7. Use 10 sec timeout
8. Review and Create

### API Gateway
1. Create a new API
2. Add a new resource
3. Add POST method with lambda function
4. In Method Request tab, use `AWS_IAM` as Authorization
5. In Integration Request tab, create a simple Body Mapping from 'Method Request Passthrough' template
6. Deploy the API
7. Download the Javascript SDK for your API

### Cognito
1. Create a new Federated Identities pool
2. Use Facebook in Authentication Providers and add the Facebook App Id
3. Review the permissions and create the pool

## Test the Code
Use the Facebook login button to start the authentication process. After getting the token, call to lambda will be executed which will run the mutation:
```javascript
client.mutate(`{
    authenticateFacebookUser(facebookToken: "${payload.token}") {
        token
    }
}`).then((token) => callback(null, {
    statusCode: 200,
    token: token,
    body: 'success'
}));
```
You should see that a new user has been created. The returned token can be used to authenticate requests to your Graphcool API as that user. Note that running the mutation again with the same Facebook token will not add a new user.
> The token can be tested using the sample app in the test folder.
