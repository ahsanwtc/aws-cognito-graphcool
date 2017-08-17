const doc = require('dynamodb-doc');

const dynamo = new doc.DynamoDB();

var jwt = require('jsonwebtoken');
var request = require('request');
var jwkToPem = require('jwk-to-pem');

exports.handler = (event, context, callback) => {
    console.log('starting');

    console.log("---------------Context:"+JSON.stringify(context, null, 2));
    console.log("---------------Event:"+JSON.stringify(event, null, 2));

    if (event.params !== null && event.params !== undefined) {
        var token = event.params.header.Authorization;
        var decodedJwt = jwt.decode(token, {complete: true});
        console.log("---------------Token:"+JSON.stringify(decodedJwt, null, 2));
    }

    callback(null, 'Hello from Lambda');
};
