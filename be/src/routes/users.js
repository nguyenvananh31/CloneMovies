import express from "express";
import { createUsers, deleteUsers, getAllUsers, getDetailUsers, updateUsers } from "../controllers/usersControllers";


const usersRoutes = express.Router();

usersRoutes.get("/" , getAllUsers)
usersRoutes.get("/:id" , getDetailUsers)
usersRoutes.post("/" , createUsers)
usersRoutes.put("/:id" , updateUsers)
usersRoutes.delete("/:id" , deleteUsers)

export default usersRoutes