const { Op } = require("sequelize");

const {isEmpty} =require('lodash');

const { Movie } = require('../models');

const getAllMovies = async (req, res) => {
    const { searchText } = req.query;

    try {
        const conditions = searchText ? {
            where: {
                title: {
                    [Op.iRegexp]: searchText
                }
            }
        } : {};
        const movies = await Movie.findAll(conditions);
        return res.json(movies);
    }
    catch (e) {
        res.status(500).json({
            message: "Movie Not Listed"
        });
    }
}

const getMovieById = async (req, res) => {
    const { movieId } = req.params;

    try {
        const movie = await Movie.findOne({
            where: {
                id: Number(movieId)
            }
        });
        if (!movie) throw new Error("Movie Not Found");
        res.json({
            message: 'Movie Found',
            movie
        });
    }
    catch (e) {
        res.status(404).json({
            message: "Movie not found"
        });
    }
}

const addMovie = async (req, res) => {
    const { title, poster, rating } = req.body;

    try {
        const createdMovie = await Movie.create({
            title,
            rating,
            poster
        });
        return res.json({
            message: 'Movie Created',
            movie: createdMovie
        })
    }
    catch (e) {
        console.log(e);
        res.status(500).json({
            message: "Movie Not Created"
        });
    }
}
const deleteMovie =async(req,res) =>{
  
    try{
      const{ movieId } = req.params
      const movie = await Movie.destroy({
        where:{
          id:movieId
          }
      })
      
      //if movie is found, then send movie details
      if(isEmpty(movie)){
         res.status(200).json({
          success:true,
          message : `Movie with Imdb id ${movieId} is deleted`
          })
      } else {
      res.status(200).json({
        success : false,
        message : `Movie with Imdb id ${movieId} is not present in database`
      })
      }
    } catch(err){
      console.log(err)
    }
  }

  const updateMovie =async(req,res) =>{
    try{
      const{ movieId } = req.params
      let update = await Movie.update( req.body,{
      where: {
        id:movieId
      }
    });
      res.status(200).json({
        success : true,
        message : `Movie with Imdb id ${movieId} has been updated.`,
      })
    } catch(err){
      console.log(err)
    }
  }

module.exports = {
    getAllMovies,
    getMovieById,
    addMovie,
    deleteMovie,
    updateMovie
}