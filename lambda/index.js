const Lokka = require('lokka').Lokka;
const Transport = require('lokka-transport-http').Transport;

const client = new Lokka({
    transport: new Transport(process.env.GRAPHCOOL_API)
});


exports.handler = (event, context, callback) => {
    console.log('starting');

    console.log("---------------Context:"+JSON.stringify(context, null, 2));
    console.log("---------------Event:"+JSON.stringify(event, null, 2));

    const operation = event["body-json"].operation;
    const payload = event["body-json"].payload;

    switch (operation) {
        case "authentication":
            client.mutate(`{
                authenticateFacebookUser(facebookToken: "${payload.token}") {
                    token
                }
            }`).then((token) => callback(null, {
                statusCode: 200,
                token: token,
                body: 'success'
            }));
            break;
        default:
            callback(new Error(`Unrecognized operation "${operation}"`));
    }
};
