import express from 'express'
import { registerUser, userLogin } from "../controllers/userAuthController.js"

export const userRoute = express.Router()

userRoute.post('/signup', registerUser)
userRoute.post('/login',userLogin)