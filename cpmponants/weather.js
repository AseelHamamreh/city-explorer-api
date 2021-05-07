const superagent = require('superagent');
require('dotenv').config();

const weatherURL = process.env.WEATHER_URL;
const weatherKey = process.env.WEATHER_KEY;
const handleWeather = (req, res) => {
  const weatherBitUrl = `${weatherURL}?key=${weatherKey}&lat=${req.query.lat}&lon=${req.query.lon}`;
  superagent.get(weatherBitUrl).then(weatherBitData => {
    const arrOfData = weatherBitData.body.data.map(data => new WeatherData(data));
    res.send(arrOfData);
  });
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
