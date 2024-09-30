import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { config } from 'dotenv'

config()

const jwt_secret = process.env.SECRET
const jwt_lifetime = process.env.LIFETIME

export const hashPassword = async(password) =>{
    const saltRounds = 10
    return await bcrypt.hash(password,saltRounds)
}

export const verifyPassword = async(pass1, pass2) =>{
    return await bcrypt.compare(pass1, pass2)

}


export const createtoken = (id) =>{
    const token = jwt.sign({id}, jwt_secret, {expiresIn: jwt_lifetime})
    return token
}

export const validToken = (token) =>{
    return jwt.verify(token, jwt_secret)
}