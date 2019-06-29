var serializer = require('./serializer');

var weatherSerializer = function(rawWeather){
  let selections = {
    hourly : [
      {
        'key' : 'data',
        'name' : 'hourly_info',
        'sub_keys' : ['time', 'icon', 'temperature']
      }
    ],
    current : [
    'time',
    'icon',
    'summary',
    'temperature',
    'apparentTemperature',
    'uvIndex',
    'visibility',
    'humidity'
  ],
    daily : [
    'summary',
    {
      'key':'data',
      'name':'daily_info',
      'sub_keys':['icon','precipProbability', 'temperatureHigh','temperatureLow']
    }
  ]
  }
  return {
    'latitude' : rawWeather.latitude,
    'longitude' : rawWeather.longitude,
    'currently' : serializer(rawWeather.currently, selections.current),
    'daily' : serializer(rawWeather.daily, selections.daily),
    'hourly' : serializer(rawWeather.hourly, selections.hourly)
  };
}

module.exports = weatherSerializer
