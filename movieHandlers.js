const database = require("./database");

const movies = [
  {
    id: 1,
    title: "Citizen Kane",
    director: "Orson Wells",
    year: "1941",
    colors: false,
    duration: 120,
  },
  {
    id: 2,
    title: "The Godfather",
    director: "Francis Ford Coppola",
    year: "1972",
    colors: true,
    duration: 180,
  },
  {
    id: 3,
    title: "Pulp Fiction",
    director: "Quentin Tarantino",
    year: "1994",
    color: true,
    duration: 180,
  },
];

const getMoviesFromJson = (req, res) => {
  res.json(movies);
};

const getMovieFromJsonById = (req, res) => {
  const id = parseInt(req.params.id);

  const movie = movies.find((movie) => movie.id === id);

  if (movie != null) {
    res.json(movie);
  } else {
    res.status(404).send("Not Found");
  }
};

const getMoviesFromDB = (req, res) => {
  database
    .query("select * from movies")
    .then((result) => {
      //console.log(result);
      res.json(result);
    })
    .catch((err) => {
      // console.error(err);
      res.status(500).send("Error retrieving movies from database");
    });
};

const getMovieFromDbById = (req, res) => {
  const id = parseInt(req.params.id);

  database
    .query("select * from movies where id = ?", [id])
    .then((movies) => {
      if (movies[0] != null) {
        res.json(movies[0]);
      } else {
        res.status(404).send("Not Found");
      }
    })
    .catch((err) => {
      // console.error(err);
      res.status(500).send("Error retrieving data from database");
    });
};

module.exports = {
  getMoviesFromJson,
  getMovieFromJsonById,
  getMoviesFromDB,
  getMovieFromDbById,
};