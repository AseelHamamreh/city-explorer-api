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

app.get('/movies', (req, res) => {
  const movieBitUrl = `https://api.themoviedb.org/3/search/movie?api_key=8922e6d8824b159e0044f0f46311c10b&query=${req.query.cityName}&limit=10`
  superagent.get(movieBitUrl).then(movieBitData => {
      const arrOfMovieData = movieBitData.body.results.map(result => new MoviesData(result));
      res.send(arrOfMovieData);
  });
});
class MoviesData{
  constructor(data){
    this.title=data.original_title;
    this.description=data.overview;
    this.myImage = data.backdrop_path;
  }
}
app.listen(4050)