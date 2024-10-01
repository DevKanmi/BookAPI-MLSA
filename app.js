import express from 'express'


//Modules
import { DbConnection } from './config/dbConnection.js'
import { Notfound } from './middlewares/notFound.js'
import logger from './utils/logger.js'
import errorHandler from './middlewares/errorHandler/index.js'

//Routes
import { userRoute } from './routes/userRoute.js'
import { bookRouter } from './routes/bookRoute.js'

export const app = express()


DbConnection()

app.use(express.json())

app.use('/api/user', userRoute)
app.use('/api/books', bookRouter)


app.use(Notfound)
app.use(errorHandler)

