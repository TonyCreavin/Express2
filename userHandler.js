const database = require('./database');

const deleteUsers = (req, res) => {
  const id = parseInt(req.params.id);

  database
    .query('delete from users where id = ?', [id])
    .then(([result]) => {
      if (result.affectedRows === 0) {
        res.status(404).send('Page Not Found');
      } else {
        res.sendStatus(204);
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Problem deleting entry');
    });
};

const putUsers = (req, res) => {
  const id = parseInt(req.params.id);
  const { firstname, lastname, email, city, language } = req.body;

  database
    .query(
      'Update users set firstname = ?, lastname = ?, email = ?, city = ?, language = ? where id = ?',
      [firstname, lastname, email, city, language, id]
    )
    .then(([result]) => {
      if (result.affectedRows === 0) {
        res.status(404).send('Not found');
      } else {
        res.sendStatus(204);
      }
    })
    .catch((err) => {
      res.status(500).send('Could not update');
    });
};

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
      res.status(500).send('Error creating user');
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
  putUsers,
  deleteUsers,
};
