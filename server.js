const express = require('express');
const app = express();
const cors = require ('cors');
const data = require ('./data/weather.json');
 
app.use(cors());
app.get('/', function (req, res) {
  res.send('Hello World')
})

app.use(cors());
app.get('/weather', function (req, res) {
  res.send(data)
})
console.log('hi');
 console.log(data);
app.listen(3002)