const weatherSerializer = require('../serializers/weather_serializer');
const fetch = require('node-fetch');
const geocode = require('./geocode');

var getWeather = function(location){



  return geocode(location)
    .then(latLng => {
      // console.log(latLng);
      let darkSkyURL = "https://api.darksky.net/forecast/" + process.env.DARKSKY_KEY + "/";
      darkSkyURL = darkSkyURL + latLng.lat.toString() + "," + latLng.lng.toString();
      return fetch(darkSkyURL)
      .then(res => { return res.json();})
      .then(res => {
        return weatherSerializer(res);
      })
    })
}

module.exports = getWeather;
