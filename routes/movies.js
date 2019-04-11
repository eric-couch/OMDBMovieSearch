var express = require("express");
var router = express.Router();
let fetch = require("node-fetch");

let favMovies = [];

router.post("/getMovie", function(req, res, next) {
  let movieTitle = req.body.movieTitle;
  let fetchURL = "https://www.omdbapi.com/?apikey=86c39163&t=" + movieTitle;
  console.log(fetchURL);
  fetch(fetchURL)
    .then(r => r.json())
    .then(body => res.render("movies", { movie: body }));
});

router.get("/getMovie", function(req, res, next) {
  let movieIMDB = req.query.imdb;
  let fetchURL = "https://www.omdbapi.com/?apikey=86c39163&i=" + movieIMDB;
  console.log(fetchURL);
  fetch(fetchURL)
    .then(r => r.json())
    .then(body => res.render("movies", { movie: body }));
});

router.post("/", function(req, res, next) {
  let movieTitle = req.body.movieTitle;
  let movieYear = req.body.movieYear;
  let movieType = req.body.movieType;
  let nextPage = req.body.page;
  let fetchURL = "https://www.omdbapi.com/?apikey=86c39163&s=" + movieTitle;
  if (movieYear) {
    fetchURL += "&y=" + movieYear;
  }
  if (movieType) {
    if (movieType != "All") {
      fetchURL += "&type=" + movieType;
    }
  }
  if (nextPage) {
    fetchURL += "&page=" + nextPage;
    nextPage++;
  } else {
    nextPage = 2;
  }

  fetch(fetchURL)
    .then(r => r.json())
    .then(body =>
      res.render("moviesList", {
        search: movieTitle,
        page: nextPage,
        movies: body
      })
    );
});

router.post("/addFav", function(req, res, next) {
  // a post of some imdb # comes into this function
  // req.body.imdbID
  // fetch('https://www.omdbapi.com/?apikey=86c39163&i=' + req.body.imdbID)
  // favMovies.push(res.body)
  let i = req.body.imdb;
  let fetchURL = "https://www.omdbapi.com/?apikey=86c39163&i=" + i;
  fetch(fetchURL)
    .then(r => r.json())
    .then(body => favMovies.push(body));
  res.send("Movie Added!");
});

router.get("/getFavs", function(req, res, next) {
  res.send(favMovies);
});
module.exports = router;
