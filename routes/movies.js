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
  let fetchURL =
    "https://www.omdbapi.com/?apikey=86c39163&i=" + movieIMDB + "&plot=full";
  console.log(fetchURL);
  let fav = favMovies.filter(movie => movie.imdbID == movieIMDB);
  if (fav.length > 0) {
    fav = true;
  } else {
    fav = false;
  }
  fetch(fetchURL)
    .then(r => r.json())
    .then(body => res.render("movies", { movie: body, fav: fav }));
});

router.post("/searchMovies", function(req, res, next) {
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
  let prevPage = nextPage - 2;
  fetch(fetchURL)
    .then(r => r.json())
    .then(body =>
      res.render("moviesList", {
        search: movieTitle,
        year: movieYear,
        type: movieType,
        page: nextPage,
        prevpage: prevPage,
        movies: body
      })
    );
});

router.post("/addFav", function(req, res, next) {
  let i = req.body.imdb;
  let fetchURL = "https://www.omdbapi.com/?apikey=86c39163&i=" + i;
  fetch(fetchURL)
    .then(r => r.json())
    .then(body => favMovies.push(body));
  res.redirect("/movieFinder.html");
});

router.post("/remFav", function(req, res, next) {
  let i = req.body.imdb;
  favMovies = favMovies.filter(movie => movie.imdbID != i);
  res.redirect("/movieFinder.html");
});

router.get("/getFavs", function(req, res, next) {
  res.render("favMovies", { favMovies: favMovies });
});
module.exports = router;
