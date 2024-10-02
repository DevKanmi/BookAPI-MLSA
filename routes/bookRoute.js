import express from 'express'

export const bookRouter = express.Router()

import { createBook, getAllBooks, deleteABook, updateABook} from "../controllers/bookController.js";
import { tokenAuthentication } from "../middlewares/userAuthentication.js";

bookRouter.post('/create', tokenAuthentication, createBook)
bookRouter.get('/myBooks', tokenAuthentication, getAllBooks)
bookRouter.delete('/:id/delete', tokenAuthentication, deleteABook)
bookRouter.put('/:id/update',tokenAuthentication, updateABook)