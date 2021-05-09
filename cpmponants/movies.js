const superagent = require('superagent');
require('dotenv').config();
const Cache = require('./Cache.js');

const handleMovies = (req, res) => {
  try{
    const moviesURL = process.env.MOVIE_URL;
    const movieKey = process.env.MOVIE_KEY;
    const movieBitUrl= moviesURL;
    const city= req.query.cityName;
    const params={
      api_key: movieKey,
      query: city,
    };
    // const movieBitUrl = `${moviesURL}?api_key=${movieKey}&query=${req.query.cityName}&limit=10`;

    if(Cache[city]){
      console.log('Movies cache hit');
      res.send(Cache[city]);
    }
    else{
      console.log('Movies cache miss');
      superagent.get(movieBitUrl).query(params).then(movieBitData => {
        const arrOfMovieData = movieBitData.body.results.map(result => new MoviesData(result));
        res.send(arrOfMovieData);
        Cache[city]=arrOfMovieData;
      });
    }
  }
  catch(error){
    console.log(error);
  }
};

class MoviesData{
  constructor(data){
    this.title=data.original_title;
    this.description=data.overview;
    this.image = `https://www.themoviedb.org/t/p/original/${data.backdrop_path}`;
    this.date=data.release_date;
    this.avg=data.vote_average;
    this.total=data.vote_count;
  }
}

module.exports = handleMovies;
