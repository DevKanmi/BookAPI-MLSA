import express from 'express'

export const bookRouter = express.Router()

import { createBook, getAllBooks } from "../controllers/bookController.js";
import { tokenAuthentication } from "../middlewares/userAuthentication.js";

bookRouter.post('/create', tokenAuthentication, createBook)
bookRouter.get('/myBooks', tokenAuthentication, getAllBooks)