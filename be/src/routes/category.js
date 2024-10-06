import express from "express";
import { createCategory, deleteCategory, getAllCategories, getDetailCategory, updateCategory } from "../controllers/categoryControllers.js";


const cateRoutes = express.Router();

cateRoutes.get("/" , getAllCategories)
cateRoutes.get("/:id" , getDetailCategory)
cateRoutes.post("/" , createCategory)
cateRoutes.put("/:id" , updateCategory)
cateRoutes.delete("/:id" , deleteCategory)

export default cateRoutes