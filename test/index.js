const Lokka = require('lokka').Lokka;
const Transport = require('lokka-transport-http').Transport;

const config = require('./config.json');

const headers = {
  Authorization: 'Bearer --token--'
  // Authorization: "asdadaadadasdasdasdasddaldkmlkfnsadkfnasd"
};

const client = new Lokka({
  transport: new Transport(config.API_URL, {headers})
});

function getItems() {
  return client.query(`
      {
      user {
        id
        facebookUserId
      }
    }

  `).then(user => {
        console.log(user);
  });
}

getItems();
