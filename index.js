import {app} from './app.js'
import logger from './utils/logger.js'
import {PORT} from './config/dbConnection.js'

app.listen(PORT,
    logger.info(`Status: Server is Running Successfully on port ${PORT}`)
)