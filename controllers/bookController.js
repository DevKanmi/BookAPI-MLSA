//Import Packages
import { StatusCodes } from "http-status-codes";



//Import files
import { successResponse, errorResponse } from "../utils/responses.js";
import User from "../models/userSchema.js";
import Book from "../models/bookSchema.js";
import logger from "../utils/logger.js";


export const createBook = async(req, res, next) =>{
    
    if(!req.user) errorResponse(res, StatusCodes.UNAUTHORIZED, `only Logged In users are allowed to Create Books!`)
    const {title , author, genre} = req.body
    const userId = req.user.id
    
    try{
        logger.info(`START: Attempting creation of a book`)
        const user = await User.findOne({_id: userId})
        if(!user) {
            logger.info(`END: not logged In`)
            return errorResponse(res, StatusCodes.NOT_FOUND, `No Such User was found in the DB, Please Sign up or Login.`)
             }
        const book = await Book.create({
            title,
            author,
            genre,
            user: user._id
        })

        user.books = user.books.concat(book._id)
        await user.save()

        logger.info(`END: Book Creation was Successful`)
        successResponse(res, StatusCodes.CREATED, `Book has been Created`, book)
}
    catch(error){
        console.log(error)
        next(error)
    }
}


export const getAllBooks = async(req, res, next) =>{

    if(!req.user) errorResponse(res, StatusCodes.UNAUTHORIZED, `only Logged In users are allowed to access this!`)
    const userId = req.user.id

    try{
        logger.info(`START: Attempting getting all Books`)

        const user = await User.findOne({_id: userId})
        if(!user){ 
            logger.info(`END : User was not found`)
            return errorResponse(res, StatusCodes.NOT_FOUND, `Such User does not exist!`)
        }
        
        const books = await Book.find({user: user._id})
        if(!books) return errorResponse(res, StatusCodes.NOT_FOUND, `No books were Found!`)
        
        logger.info(`END: Books were returned Succesfully`)
        successResponse(res, StatusCodes.OK, `Here are the Books`, books)

    }
    catch(error){
        console.log(error)
        next(error)

    }
}

export const deleteABook = async(req, res, next) =>{
    if(!req.user) errorResponse(res, StatusCodes.UNAUTHORIZED, `only Logged In users are allowed to access this!`)
        const userId = req.user.id
        const bookid = req.params.id
    
        try{
            logger.info(`START: Deletion of A book`)
    
            const user = await User.findOne({_id: userId})
            if(!user){ 
                logger.info(`END : User was not found`)
                return errorResponse(res, StatusCodes.NOT_FOUND, `Such User does not exist!`)
            }

            const book = await Book.findByIdAndDelete({_id: bookid, user: userId})
            if(!book) return errorResponse(res, StatusCodes.UNAUTHORIZED, `Only User that Created Book can delete!`)

            await User.updateMany(
                {books: req.params.id},
                {$pull :{books: req.params.id}})

            logger.info(`END: Deletion of book successful`)
            successResponse(res, StatusCodes.NO_CONTENT, `Book has been deleted`)
            
        }
        catch(error){
            console.log(error)
            next(error)
        }
}
