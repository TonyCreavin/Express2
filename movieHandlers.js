const { getRandomValues } = require('crypto');
const database = require('./database');

const movies = [
  {
    id: 1,
    title: 'Citizen Kane',
    director: 'Orson Wells',
    year: '1941',
    colors: false,
    duration: 120,
  },
  {
    id: 2,
    title: 'The Godfather',
    director: 'Francis Ford Coppola',
    year: '1972',
    colors: true,
    duration: 180,
  },
  {
    id: 3,
    title: 'Pulp Fiction',
    director: 'Quentin Tarantino',
    year: '1994',
    color: true,
    duration: 180,
  },
];

const putMovies = (req, res) => {
  const id = parseInt(req.params.id);
  const { title, director, year, color, duration } = req.body;

  database
    .query(
      'update movies set title = ?, director = ?, year = ?, color = ?, duration = ? where id = ?',
      [title, director, year, color, duration, id]
    )

    .then(([result]) => {
      if (result.affectedRows === 0) {
        res.status(404).send('Not found');
      } else {
        res.sendStatus(204);
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Could not update');
    });
};
const postMovies = (req, res) => {
  const { title, director, year, color, duration } = req.body;

  database
    .query(
      'INSERT INTO movies(title, director, year, color, duration) VALUES (?, ?, ?, ?, ?)',
      [title, director, year, color, duration]
    )
    .then(([result]) => {
      res.status(201).json(result.insertId);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error savin the movie');
    });
};

const getMoviesFromJson = (req, res) => {
  res.json(movies);
};

const getMovieFromJsonById = (req, res) => {
  const id = parseInt(req.params.id);

  const movie = movies.find((movie) => movie.id === id);

  if (movie != null) {
    res.json(movie);
  } else {
    res.status(404).send('Not Found');
  }
};

const getMoviesFromDB = (req, res) => {
  database
    .query('select * from movies')
    .then((result) => {
      //console.log(result);
      res.json(result[0]);
    })
    .catch((err) => {
      // console.error(err);
      res.status(500).send('Error retrieving movies from database');
    });
};

const getMovieFromDbById = (req, res) => {
  const id = parseInt(req.params.id);

  database
    .query('select * from movies where id = ?', [id])
    .then((movies) => {
      if (movies[0] != null) {
        res.json(movies[0]);
      } else {
        res.status(404).send('Not Found');
      }
    })
    .catch((err) => {
      // console.error(err);
      res.status(500).send('Error retrieving data from database');
    });
};

module.exports = {
  getMoviesFromJson,
  getMovieFromJsonById,
  getMoviesFromDB,
  getMovieFromDbById,
  postMovies,
  putMovies,
};
