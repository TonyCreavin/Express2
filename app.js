require("dotenv").config();

const express = require("express");

const app = express();

const port = process.env.APP_PORT ?? 5000;

const welcome = (req, res) => {
  res.send("Welcome to my favourite movie list");
};

app.get("/", welcome);

const movieHandlers = require("./movieHandlers");
const userHandler = require("./userHandler");

app.get("/api/movies-json", movieHandlers.getMoviesFromJson);
app.get("/api/movies-json/:id", movieHandlers.getMovieFromJsonById);

app.get("/api/movies", movieHandlers.getMoviesFromDB);
app.get("/api/movies/:id", movieHandlers.getMovieFromDbById);

app.get("/api/users", userHandler.getUsers);
app.get("/api/users/:id", userHandler.getUserById);

app.listen(port, (err) => {
  if (err) {
    console.error("Something bad happened");
  } else {
    console.log(`Server is listening on ${port}`);
  }
});
