const express = require('express');
const app = express();
const weather = require ('./data/weather.json');

const cors = require ('cors');
app.use(cors());


app.get('/', function (req, res) {
  res.send('Hello World')
})

app.get('/weather', function (req, res) {
  const dataArray = weather.data.map(data => new WeatherData(data));
  res.send(dataArray)
})

class WeatherData{
  constructor(data){
    this.date=data.valid_date;
    this.description=data.weather.description;
  }
}
app.listen(3007)
