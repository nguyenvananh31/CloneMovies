import express from "express";
import moviesRoutes from "./movies.js";
import cateRoutes from "./category.js";
import usersRoutes from "./users.js";

const routes = express.Router();

routes.use("/movies" , moviesRoutes)
routes.use("/category" , cateRoutes)
routes.use("/users" , usersRoutes)


export default routes