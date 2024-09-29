//Package Imports
import { StatusCodes } from "http-status-codes";
import mongoose from "mongoose";


//Module Imports
import User from "../models/userSchema.js";
import logger from "../utils/logger.js";
import { errorResponse, successResponse } from "../utils/responses.js";
import { hashPassword, verifyPassword, createtoken, validToken } from "../utils/Auth.js";


export const registerUser = async(req, res, next) =>{
    const {name, username, email, password} = req.body
    try{
        logger.info(`START: User Creation has Started`)
        if(username === password){
            logger.info(`END: username and password are similiar`)
            return errorResponse(res, StatusCodes.BAD_REQUEST, `Username and Password Can't be the same!`)
        }
        const existingUser = await User.findOne({ $or: [{ username }, { email }] })

        if(existingUser){
            logger.info(`END: username and email are present in DB, expected Unique Details!`)
            return errorResponse(res, StatusCodes.BAD_REQUEST,`Username/Email has been taken, try with another Username!`)
        }

        const newUser = await User.create({
            name,
            username,
            email,
            password: await hashPassword(password)
     })
    logger.info(`END: User Created Successully`)
    return successResponse(res, StatusCodes.CREATED,'User Created Sucessfully', newUser)



    }
    catch(error){
        logger.info(`END: User Registration was not Successful, Passed to ErrorHandler`)
        next(error)
    }
}

