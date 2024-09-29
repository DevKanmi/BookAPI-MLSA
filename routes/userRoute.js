import express from 'express'
import { registerUser } from "../controllers/userAuthController.js"

export const userRoute = express.Router()

userRoute.post('/signup', registerUser)