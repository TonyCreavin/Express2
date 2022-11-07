const database = require('./database');

const postUsers = (req, res) => {
  const { firstname, lastname, email, city, language } = req.body;

  database
    .query(
      'INSERT INTO users (firstname, lastname, email, city, language) VALUES ( ?, ?, ?, ?, ?)',
      [firstname, lastname, email, city, language]
    )
    .then(([result]) => {
      res.status(201).json(result.insertId);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Cannot load contact');
    });
};

const getUsers = (req, res) => {
  database
    .query('select * from users')
    .then((result) => {
      console.log(result[0]);
      res.json(result[0]);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error retrieving users from database');
    });
};

const getUserById = (req, res) => {
  const id = parseInt(req.params.id);

  database
    .query('select * from users where id = ?', [id])
    .then((result) => {
      console.log(result);
      if (result[0] != null) {
        res.json(result[0]);
      } else {
        res.status(404).send('Not Found');
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error retrieving data from database');
    });
};

module.exports = {
  getUsers,
  getUserById,
  postUsers,
};
