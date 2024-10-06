import express from "express";
import { createMovie, deleteMovie, getAllMovies, getDetailMovies, updateMovie } from "../controllers/moviesControllers.js";


const moviesRoutes = express.Router();

moviesRoutes.get("/" , getAllMovies)
moviesRoutes.get("/:id" , getDetailMovies)
moviesRoutes.post("/" , createMovie)
moviesRoutes.put("/:id" , updateMovie)
moviesRoutes.delete("/:id" , deleteMovie)

export default moviesRoutes