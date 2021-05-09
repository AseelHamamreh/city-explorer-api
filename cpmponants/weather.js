const superagent = require('superagent');
require('dotenv').config();
const Cache = require('./Cache.js');

const handleWeather = (req, res) => {
  try{
    const weatherURL = process.env.WEATHER_URL;
    const weatherKey = process.env.WEATHER_API_KEY;
    const weatherBitUrl= weatherURL;
    const lat= req.query.lat;
    const lon= req.query.lon;
    const params={
      key: weatherKey,
      lat: lat,
      lon: lon,
    };
    // const weatherBitUrl = `${weatherURL}?key=${weatherKey}&lat=${req.query.lat}&lon=${req.query.lon}`;
    if(Cache[lat,lon]){
      console.log('Weather cache hit');
      res.send(Cache[lat,lon]);
    }
    else{
      console.log('Weather cache miss');
      superagent.get(weatherBitUrl).query(params).then(weatherBitData => {
        const arrOfData = weatherBitData.body.data.map(data => new WeatherData(data));
        res.send(arrOfData);
        Cache[lat,lon]=arrOfData;
      });
    }
  }
  catch(error){
    console.log(error);
  }
};

class WeatherData{
  constructor(data){
    this.date=data.valid_date;
    this.description=data.weather.description;
    this.highT=data.high_temp;
    this.lowT=data.low_temp;
  }
}
module.exports = handleWeather;
