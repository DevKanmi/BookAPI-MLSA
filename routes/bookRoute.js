import express from 'express'

export const bookRouter = express.Router()

import { createBook, getAllBooks, deleteABook} from "../controllers/bookController.js";
import { tokenAuthentication } from "../middlewares/userAuthentication.js";

bookRouter.post('/create', tokenAuthentication, createBook)
bookRouter.get('/myBooks', tokenAuthentication, getAllBooks)
bookRouter.delete('/:id/delete', tokenAuthentication, deleteABook)