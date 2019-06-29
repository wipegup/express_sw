const fetch = require('node-fetch');
const dotenv = require('dotenv');
dotenv.config();

const geocode = function(location){
  let urlBase = 'https://maps.googleapis.com/maps/api/geocode/json?';
  let query = {
    'address': location,
    'key': process.env.GEOCODE_KEY
  };

  let url = buildURL(urlBase, query);

  return fetch(url)
    .then(res => { return res.json();})
    .then(res => { return res.results[0].geometry.location;})
}

const buildURL = function(base, query){
  let url = base;

  for (let param in query){
    let queryString = param + "=" + query[param]+'&';
    url += queryString;
  }
  return url;
}
module.exports = geocode
