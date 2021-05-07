const superagent = require('superagent');
require('dotenv').config();

const moviesURL = process.env.MOVIE_URL;
const movieKey = process.env.MOVIE_KEY;
const handleMovies = (req, res) => {
  const movieBitUrl = `${moviesURL}?api_key=${movieKey}&query=${req.query.cityName}&limit=10`;
  superagent.get(movieBitUrl).then(movieBitData => {
    const arrOfMovieData = movieBitData.body.results.map(result => new MoviesData(result));
    res.send(arrOfMovieData);
  });
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
