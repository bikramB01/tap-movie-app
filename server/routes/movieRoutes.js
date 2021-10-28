const express = require("express");
const { getAllMovies, getMovieById, addMovie,deleteMovie,updateMovie } = require("../controllers/movieController");

const router = express.Router();

router
    .get("/", getAllMovies)
    .get("/:movieId", getMovieById)
    .post("/create", addMovie)
    .delete("/delete/:movieId",deleteMovie)
    .put("/update/:movieId",updateMovie)

module.exports = router;