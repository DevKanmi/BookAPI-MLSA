import {config} from 'dotenv'
import * as mongoose from 'mongoose'
import logger from '../utils/logger.js'

config()

const MONGODB_URI = process.env.MONGODB_URI

export const PORT = process.env.PORT

mongoose.set('strictQuery', false)

export const DbConnection = async() =>{
    try{
        logger.info(`START: Attempting Connection to DB`)
        await mongoose.connect(MONGODB_URI)
        logger.info(`END: Successfully Connected to DB`)
    }
    catch(error) {
        logger.info(`END: DB connection Was not Successful, Try Again!`, error.message)
    }
}

