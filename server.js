const express = require('express');
const app = express();
// const weather = require ('./data/weather.json');
require('dotenv').config();
const handleWeather = require ('./cpmponants/weather');
const handleMovies = require ('./cpmponants/movies');


const cors = require ('cors');
app.use(cors());
const PORT = process.env.PORT;

app.get('/', function (req, res) {
  res.send('Hello World');
});

app.get('/weather',handleWeather);



app.get('/movies',handleMovies );

app.listen(PORT, ()=>{
  console.log(PORT);
});
