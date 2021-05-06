const express = require('express');
const app = express();
const weather = require ('./data/weather.json');
const superagent = require('superagent');


const cors = require ('cors');
app.use(cors());


app.get('/', function (req, res) {
  res.send('Hello World')
})

app.get('/weather', (req, res) => {
      const weatherBitUrl = `https://api.weatherbit.io/v2.0/forecast/daily?key=0bda87c6bdef4494a1e2e0301953a301&lat=${req.query.lat}&lon=${req.query.lon}`;
      superagent.get(weatherBitUrl).then(weatherBitData => {
          const arrOfData = weatherBitData.body.data.map(data => new WeatherData(data));
          res.send(arrOfData);
      });
});

class WeatherData{
  constructor(data){
    this.date=data.valid_date;
    this.description=data.weather.description;
    this.highT=data.high_temp;
    this.lowT=data.low_temp;
  }
}


app.listen(6070)